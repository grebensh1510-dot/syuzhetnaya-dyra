// Вырезает кремовую подложку из портретов, оставляя рваный коллаж на
// прозрачном фоне.
//
// Почему заливкой от края, а не по цвету: внутри коллажа полно светлого —
// бумага, небо, платье Котика. Отбор «всё, что похоже на кремовый» пробил бы
// в них дыры. Заливка идёт только по СВЯЗНОЙ области, начатой от рамки
// картинки, поэтому внутренние светлые пятна она не достаёт: до них нужно
// пройти через тёмный коллаж, а он её останавливает.
//
// Край сглаживается: жёсткая маска даёт зубцы на рваной бумаге, которая как
// раз и должна выглядеть рваной, а не пиксельной. Альфа размывается на пару
// пикселей — этого хватает.
//
// Запуск: node scripts/cutout.mjs [допуск]

import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { join } from 'node:path';

// Исходники лежат ВНЕ public: там только то, что уезжает на хостинг.
// Полные кадры с кремовой подложкой нигде на сайте не показываются —
// незачем возить их по 140 КБ в каждой сборке.
const SRC = 'assets/heroes';
const OUT = 'public/heroes/cut';
const TOL = Number(process.argv[2] || 30);

await mkdir(OUT, { recursive: true });

const names = (await readdir(SRC)).filter((n) => n.endsWith('.jpg'));

for (const name of names) {
  const file = join(SRC, name);
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const ch = info.channels;

  // Цвет подложки — медиана по рамке. Медиана, а не среднее: один тёмный
  // мазок, дотянувшийся до края, среднее бы утащил, медиану — нет.
  const rs = [];
  const gs = [];
  const bs = [];
  const push = (x, y) => {
    const i = (y * W + x) * ch;
    rs.push(data[i]);
    gs.push(data[i + 1]);
    bs.push(data[i + 2]);
  };
  for (let x = 0; x < W; x += 1) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y += 1) {
    push(0, y);
    push(W - 1, y);
  }
  const med = (a) => a.sort((p, q) => p - q)[a.length >> 1];
  const bg = [med(rs), med(gs), med(bs)];

  const near = (i) =>
    Math.abs(data[i] - bg[0]) <= TOL &&
    Math.abs(data[i + 1] - bg[1]) <= TOL &&
    Math.abs(data[i + 2] - bg[2]) <= TOL;

  // Заливка от рамки. Стек вместо рекурсии: 820×1230 рекурсией не пройти.
  const isBg = new Uint8Array(W * H);
  const stack = [];
  const seed = (x, y) => {
    const p = y * W + x;
    if (!isBg[p] && near(p * ch)) {
      isBg[p] = 1;
      stack.push(p);
    }
  };
  for (let x = 0; x < W; x += 1) {
    seed(x, 0);
    seed(x, H - 1);
  }
  for (let y = 0; y < H; y += 1) {
    seed(0, y);
    seed(W - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W;
    const y = (p - x) / W;
    if (x > 0) seed(x - 1, y);
    if (x < W - 1) seed(x + 1, y);
    if (y > 0) seed(x, y - 1);
    if (y < H - 1) seed(x, y + 1);
  }

  // Альфа: 0 на подложке, 255 на коллаже, сглаженная по краю боксовым
  // размытием радиуса 1 — два прохода, по осям.
  const a0 = new Float32Array(W * H);
  for (let p = 0; p < W * H; p += 1) a0[p] = isBg[p] ? 0 : 255;

  const blur = (src) => {
    const tmp = new Float32Array(W * H);
    const dst = new Float32Array(W * H);
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        const l = src[y * W + Math.max(0, x - 1)];
        const c = src[y * W + x];
        const r = src[y * W + Math.min(W - 1, x + 1)];
        tmp[y * W + x] = (l + c + r) / 3;
      }
    }
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        const u = tmp[Math.max(0, y - 1) * W + x];
        const c = tmp[y * W + x];
        const d = tmp[Math.min(H - 1, y + 1) * W + x];
        dst[y * W + x] = (u + c + d) / 3;
      }
    }
    return dst;
  };
  const alpha = blur(a0);

  const out = Buffer.alloc(W * H * 4);
  for (let p = 0; p < W * H; p += 1) {
    const s = p * ch;
    const o = p * 4;
    out[o] = data[s];
    out[o + 1] = data[s + 1];
    out[o + 2] = data[s + 2];
    out[o + 3] = Math.round(Math.max(0, Math.min(255, alpha[p])));
  }

  let cut = 0;
  for (let p = 0; p < W * H; p += 1) if (isBg[p]) cut += 1;

  const dest = join(OUT, name.replace(/\.jpg$/, '.png'));
  await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  console.log(
    `${name.padEnd(13)} подложка ${JSON.stringify(bg)} · снято ${((cut / (W * H)) * 100).toFixed(1)}%` +
      ` · ${(statSync(dest).size / 1024).toFixed(0)} КБ`
  );
}
