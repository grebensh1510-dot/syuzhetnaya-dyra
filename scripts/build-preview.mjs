// Превращает готовую сборку в набор файлов, который можно положить в подпапку
// чужого домена.
//
// Зачем вообще: на своём хостинге сайт лежит в корне, и «/hero/ionych.jpg» —
// правильный адрес. В предпросмотре он лежит по адресу вида …/artifact/<id>/,
// и тот же ведущий слеш уводит в корень домена, мимо сайта.
//
// Делается две вещи.
//
// 1. Страницы раскладываются одним уровнем: ionych/dosye/starcev.html
//    становится ionych-dosye-starcev.html. Это не косметика. Пока страницы
//    лежат на разной глубине, адрес одной и той же таблицы стилей записан
//    у них по-разному, и при переходе лепестками (ClientRouter подменяет
//    документ) относительная ссылка успевает разрешиться от старого адреса —
//    новая страница открывается голой. Один уровень — один и тот же адрес.
//
// 2. Все адреса от корня переписываются на относительные: href, src, srcset
//    и url(…) — и в разметке, и в .css, где тоже встречается url(/…).
//
// Адреса, которые JS строит во время работы, сюда не попадают — ими
// занимается src/scripts/paths.js.
//
// Запуск: PUBLIC_PREVIEW=1 astro build && node scripts/build-preview.mjs

import { readdir, readFile, writeFile, stat, rename, rm } from 'node:fs/promises';
import { join, relative, sep, dirname } from 'node:path';

const DIST = 'dist';
const asPosix = (p) => p.split(sep).join('/');

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

// ─── 1. Раскладка страниц одним уровнем ───

let files = (await walk(DIST)).map((f) => asPosix(relative(DIST, f)));

// Что чем стало: «ionych/dosye/starcev.html» → «ionych-dosye-starcev.html».
const flat = new Map();
for (const f of files) {
  if (!f.endsWith('.html')) continue;
  flat.set(f, f.includes('/') ? f.replace(/\//g, '-') : f);
}

for (const [from, into] of flat) {
  if (from === into) continue;
  await rename(join(DIST, from), join(DIST, into));
}

// Каталоги из-под страниц убираем, если в них ничего не осталось.
const emptied = [...new Set([...flat.keys()].filter((f) => f.includes('/')).map(dirname))];
for (const d of emptied.sort((a, b) => b.length - a.length)) {
  try {
    if ((await readdir(join(DIST, d))).length === 0) await rm(join(DIST, d), { recursive: true });
  } catch {}
}

files = (await walk(DIST)).map((f) => asPosix(relative(DIST, f)));
const exists = new Set(files);

// ─── 2. Адреса ───

let rewritten = 0;
const unknown = new Set();

// «/ionych/dosye/» → «ionych-dosye.html», «/hero/x.jpg» → «hero/x.jpg».
function target(abs) {
  const cut = abs.search(/[?#]/);
  const pathPart = cut < 0 ? abs : abs.slice(0, cut);
  const tail = cut < 0 ? '' : abs.slice(cut);
  const bare = pathPart.replace(/^\/|\/$/g, '');

  // Каталог (или корень) — это страница.
  if (pathPart === '/' || pathPart.endsWith('/')) {
    const page = bare === '' ? 'index.html' : `${bare.replace(/\//g, '-')}.html`;
    return exists.has(page) ? { p: page, tail } : null;
  }
  return exists.has(bare) ? { p: bare, tail } : null;
}

function rewrite(text, depth) {
  const up = depth === 0 ? './' : '../'.repeat(depth);

  const one = (abs) => {
    if (!abs.startsWith('/') || abs.startsWith('//')) return null;
    const t = target(abs);
    if (!t) {
      unknown.add(abs);
      return null;
    }
    rewritten += 1;
    return up + t.p + t.tail;
  };

  text = text.replace(/\b(href|src)="(\/[^"]*)"/g, (m, attr, abs) => {
    const r = one(abs);
    return r === null ? m : `${attr}="${r}"`;
  });

  text = text.replace(/\bsrcset="([^"]*)"/g, (m, val) =>
    `srcset="${val
      .split(',')
      .map((piece) => {
        const t = piece.trim();
        const [u, ...rest] = t.split(/\s+/);
        const r = one(u);
        return r === null ? t : [r, ...rest].join(' ');
      })
      .join(', ')}"`
  );

  text = text.replace(/url\((['"]?)(\/[^'")]+)\1\)/g, (m, q, abs) => {
    const r = one(abs);
    return r === null ? m : `url(${q}${r}${q})`;
  });

  return text;
}

for (const rel of files) {
  if (!/\.(html|css)$/.test(rel)) continue;
  const depth = rel.split('/').length - 1;
  const file = join(DIST, rel);
  const src = await readFile(file, 'utf8');
  const out = rewrite(src, depth);
  if (out !== src) await writeFile(file, out);
}

console.log(`Страниц разложено одним уровнем: ${flat.size}`);
console.log(`Переписано адресов: ${rewritten}`);
if (unknown.size) {
  console.log('Под эти адреса файла не нашлось:');
  [...unknown].forEach((u) => console.log('   ', u));
}

// ─── Проверка ───

let left = 0;
const depths = new Set();
for (const rel of files) {
  if (!rel.endsWith('.html')) continue;
  depths.add(rel.split('/').length - 1);
  const m = (await readFile(join(DIST, rel), 'utf8')).match(/\b(?:href|src)="\/(?!\/)[^"]*"/g);
  if (m) {
    left += m.length;
    console.log(rel, '→', m.slice(0, 5).join(' '));
  }
}
console.log(
  left === 0 ? 'Адресов от корня в разметке не осталось.' : `ОСТАЛОСЬ ОТ КОРНЯ: ${left}`
);
console.log(
  depths.size === 1 && depths.has(0)
    ? 'Все страницы на одном уровне.'
    : `СТРАНИЦЫ НА РАЗНЫХ УРОВНЯХ: ${[...depths].join(', ')}`
);
