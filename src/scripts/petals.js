// Выбор движка и общий вход. Наружу торчит window.__PETALS__ с одним
// интерфейсом, чтобы переходы не знали, на чём они сейчас нарисованы.
//
// §8: переход — событие смены сцены, не украшение каждого клика.
// §6.5: при prefers-reduced-motion лепестков нет вовсе, только кроссфейд.

import { createPetalField2D } from './petals-2d.js';

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Слабое устройство: мало ядер, мало памяти или узкий экран с низким dpr.
function weakDevice() {
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (cores <= 4 && mem <= 4) return true;
  if (mem <= 2) return true;
  return false;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

let field = null;
let pending = null;

async function build(canvas) {
  if (!reduce() && !weakDevice() && hasWebGL()) {
    try {
      const { createPetalField } = await import('./petals-gl.js');
      const gl = createPetalField(canvas);
      if (gl) return gl;
    } catch {
      // Молча падаем на 2D: сцена важнее движка.
    }
  }
  return createPetalField2D(canvas);
}

export async function mountPetals() {
  const canvas = document.querySelector('canvas.petals');
  if (!canvas || field || pending) return field;

  // При reduced-motion не поднимаем вообще ничего: ни канваса, ни цикла.
  if (reduce()) {
    window.__PETALS__ = {
      kind: 'none',
      burst: (x, y, cb) => cb && cb(),
      setAmbient() {},
      setWind() {},
    };
    return window.__PETALS__;
  }

  pending = build(canvas);
  field = await pending;
  pending = null;
  window.__PETALS__ = field;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) field.setAmbient(0);
  });

  return field;
}

// Титульная сцена: редкие лепестки фоном, скролл добавляет им сноса.
export async function mountTitleScene({ count = 22 } = {}) {
  const f = await mountPetals();
  if (!f || f.kind === 'none') return;

  f.setAmbient(count);

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const p = Math.min(1, window.scrollY / max);
        f.setWind(-40 - p * 260);
        ticking = false;
      });
    },
    { passive: true }
  );
}

// Переход между разделами: жест из точки нажатия, потом подмена сцены.
export function armSceneLinks(selector = '[data-petal-link]') {
  document.addEventListener('click', async (e) => {
    const link = e.target.closest(selector);
    if (!link) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const href = link.getAttribute('href');
    if (!href) return;

    const f = await mountPetals();
    if (!f || f.kind === 'none') return;

    e.preventDefault();
    const r = link.getBoundingClientRect();
    f.burst(r.left + r.width / 2, r.top + r.height / 2, () => {
      window.location.href = href;
    });
  });
}
