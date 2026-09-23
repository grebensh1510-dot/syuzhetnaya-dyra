// Заглавие из частиц: слово собирается из пыли и разлетается под курсором.
//
// Приём из присланного компонента: текст рисуется на холст, непрозрачные
// пиксели становятся частицами, курсор их расталкивает, пружина возвращает
// домой. Без React и без канвас-библиотек — здесь считать нечего, кроме
// двух строк интегрирования на частицу.
//
// ─── Где это НЕ включается и почему ───
//
// Только при точном указателе. Эффект курсорный, а на телефоне курсора нет:
// единственное касание заглавия там — это начало прокрутки, и слово
// рассыпалось бы ровно в тот момент, когда человек хочет уехать вниз. На
// телефоне остаётся нарисованное заглавие, оно и так на месте.
//
// При prefers-reduced-motion — тоже нет: это движение, а не оформление.
//
// Разметка при этом не меняется: SVG-заглавие лежит в странице всегда и
// показывается само, если скрипт не поднялся. Холст его подменяет, а не
// заменяет: строка остаётся в <h1> для чтения с экрана.

// Пружина и расталкивание. Подобраны так, чтобы слово возвращалось за
// полсекунды и не дрожало у цели.
const SPRING = 0.09;
const DAMP = 0.84;
const PUSH_RADIUS = 130;
const PUSH_FORCE = 3.6;

// Шаг выборки и размер зерна в CSS-пикселях.
//
// Зерно чуть КРУПНЕЕ шага — это важно. При зерне меньше шага слово в покое
// читается трафаретом: над фотографией из дыр между точками лезет фон, и
// заглавие пропадает. С небольшим перекрытием покой выглядит плотными
// чернилами, а зерно видно только когда частицы разлетелись, — то есть
// ровно тогда, когда оно и должно быть видно.
//
// Шаг 3 даёт около трёх тысяч частиц на «Ионыч»: на кадр этого мало.
const STEP = 3;
const GRAIN = 3.1;

export function mountTitleParticles() {
  const host = document.querySelector('[data-ht]');
  if (!host || host.dataset.particles) return;

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || still) return;

  const svg = host.querySelector('.ht__svg');
  const canvas = host.querySelector('.ht__canvas');
  const text = host.dataset.htText;
  if (!svg || !canvas || !text) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  host.dataset.particles = 'pending';

  // Геометрия взята из viewBox заглавия, чтобы слово встало ровно туда, где
  // его рисует SVG, — иначе росчерк перестанет совпадать со словом.
  const VB = { x: 150, y: -10, w: 700, h: 195 };
  const BASELINE = 152;
  const FONT = 200;

  let dpr = 1;
  let W = 0;
  let H = 0;

  // Плоские массивы вместо объектов: на две тысячи частиц разница в кадре
  // заметна, а читаемость страдает в одном месте.
  let hx = new Float32Array(0);
  let hy = new Float32Array(0);
  let px = new Float32Array(0);
  let py = new Float32Array(0);
  let vx = new Float32Array(0);
  let vy = new Float32Array(0);
  let size = new Float32Array(0);
  let count = 0;

  let mx = -9999;
  let my = -9999;
  let raf = null;
  let visible = true;
  let assembled = false;

  function sample() {
    const box = svg.getBoundingClientRect();
    if (!box.width) return false;

    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.round(box.width);
    H = Math.round(box.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const scale = W / VB.w;

    // Пробный холст: рисуем слово и читаем, где у него чернила.
    const probe = document.createElement('canvas');
    probe.width = canvas.width;
    probe.height = canvas.height;
    const p = probe.getContext('2d', { willReadFrequently: true });
    if (!p) return false;

    p.scale(dpr, dpr);
    p.fillStyle = '#000';
    p.textAlign = 'center';
    p.textBaseline = 'alphabetic';
    p.font = `${FONT * scale}px Prata, "Playfair Display", Georgia, serif`;
    p.fillText(text, W / 2, (BASELINE - VB.y) * scale);

    const data = p.getImageData(0, 0, probe.width, probe.height).data;
    // STEP задан в CSS-пикселях — на устройстве шаг вдвое больше при dpr 2.
    const step = Math.max(2, Math.round(STEP * dpr));

    const ax = [];
    const ay = [];
    const as = [];
    for (let y = 0; y < probe.height; y += step) {
      for (let x = 0; x < probe.width; x += step) {
        if (data[(y * probe.width + x) * 4 + 3] > 128) {
          ax.push(x / dpr);
          ay.push(y / dpr);
          // Разброс небольшой: ровные точки читаются как сетка, но большой
          // разброс снова прорезает дыры в покое.
          as.push(GRAIN + Math.random() * 0.8);
        }
      }
    }

    count = ax.length;
    if (!count) return false;

    hx = Float32Array.from(ax);
    hy = Float32Array.from(ay);
    size = Float32Array.from(as);
    px = new Float32Array(count);
    py = new Float32Array(count);
    vx = new Float32Array(count);
    vy = new Float32Array(count);

    return true;
  }

  // Сборка на входе: частицы приходят слева волной, в том же направлении,
  // куда прежде шло перо. Разлёт по вертикали случайный — иначе слово
  // въезжает плашкой, а не собирается.
  function scatter() {
    for (let i = 0; i < count; i += 1) {
      const delay = (hx[i] / W) * 0.55;
      px[i] = hx[i] - 120 - Math.random() * 260 - delay * 240;
      py[i] = hy[i] + (Math.random() - 0.5) * 150;
      vx[i] = 0;
      vy[i] = 0;
    }
  }

  // Частицы по местам, без анимации: для пересчёта выборки.
  function snap() {
    for (let i = 0; i < count; i += 1) {
      px[i] = hx[i];
      py[i] = hy[i];
      vx[i] = 0;
      vy[i] = 0;
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    // Один цвет на весь проход: смена fillStyle на каждую частицу стоит
    // дороже самой физики.
    ctx.fillStyle = '#3f0e14';
    for (let i = 0; i < count; i += 1) {
      const s = size[i];
      ctx.fillRect(px[i] - s / 2, py[i] - s / 2, s, s);
    }
  }

  function step2() {
    const r2 = PUSH_RADIUS * PUSH_RADIUS;
    let moving = false;

    for (let i = 0; i < count; i += 1) {
      const dx = px[i] - mx;
      const dy = py[i] - my;
      const d2 = dx * dx + dy * dy;

      if (d2 < r2) {
        const d = Math.sqrt(d2) || 0.001;
        const f = (1 - d / PUSH_RADIUS) * PUSH_FORCE;
        vx[i] += (dx / d) * f;
        vy[i] += (dy / d) * f;
      }

      vx[i] = (vx[i] + (hx[i] - px[i]) * SPRING) * DAMP;
      vy[i] = (vy[i] + (hy[i] - py[i]) * SPRING) * DAMP;
      px[i] += vx[i];
      py[i] += vy[i];

      if (!moving && (Math.abs(vx[i]) > 0.06 || Math.abs(px[i] - hx[i]) > 0.3)) moving = true;
    }
    return moving;
  }

  function tick() {
    const moving = step2();
    draw();
    // Курсор рядом — продолжаем и в покое: иначе кадр встанет, а палец
    // ещё над словом, и следующий толчок пойдёт рывком.
    const near = mx > -500;
    if ((moving || near) && visible) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  function wake() {
    if (!raf && visible) raf = requestAnimationFrame(tick);
  }

  if (!sample()) {
    delete host.dataset.particles;
    return;
  }

  host.dataset.particles = 'on';
  scatter();
  assembled = true;
  wake();

  // Курсор считается в координатах холста.
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      const box = canvas.getBoundingClientRect();
      mx = e.clientX - box.left;
      my = e.clientY - box.top;
      wake();
    },
    { passive: true }
  );

  window.addEventListener('pointerleave', () => {
    mx = -9999;
    my = -9999;
    wake();
  });

  // За экраном не считаем.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        visible = en.isIntersecting;
        if (visible) wake();
      });
    },
    { rootMargin: '80px' }
  );
  io.observe(canvas);

  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      // Ширина изменилась — слово другого размера, выборку надо повторить.
      // Но не рассыпать: человек уже видел, как слово собралось.
      if (sample()) {
        snap();
        draw();
      }
    });
  });

  // Шрифт мог доехать после первой выборки — тогда чернила были не те, и
  // выборку надо повторить. Рассыпать при этом нельзя: сборка уже идёт, и
  // второй разлёт посреди неё выглядит как сбой (на нём я и поймался).
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      const before = count;
      if (!sample()) return;
      if (!assembled) {
        scatter();
        wake();
        return;
      }
      // Число частиц изменилось — старые места не подходят, ставим по новым.
      if (count !== before) snap();
      wake();
    });
  }
}
