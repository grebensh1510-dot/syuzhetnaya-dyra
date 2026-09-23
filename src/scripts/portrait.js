// Ожившие портреты.
//
// Дыхание и наклон — целиком на CSS-анимации самого <img>: период, ход и
// угол приходят из data-атрибутов страницы, у каждого героя свои. JS для
// этого не нужен, и он туда не лезет.
//
// Здесь только две вещи, которые CSS не умеет.
//
// 1. Параллакс от курсора. Один слушатель на документ, а не по одному на
//    снимок; координаты копятся и пишутся в CSS-переменные раз в кадр через
//    requestAnimationFrame — pointermove приходит чаще, чем экран успевает
//    перерисоваться. Пишутся именно переменные: пересчёта раскладки нет,
//    только композитинг.
//
// 2. Появление при входе в экран. IntersectionObserver, один раз на снимок,
//    дальше наблюдение снимается.
//
// Три уровня вложенности не от лени, а по необходимости: transform у
// элемента один. Параллакс живёт на обёртке, появление — на среднем слое,
// дыхание — на самой картинке.

export function mountPortrait() {
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shots = [...document.querySelectorAll('[data-portrait]')];
  if (!shots.length) return;

  // ─── Появление ───
  if (still) {
    shots.forEach((s) => (s.dataset.seen = 'yes'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.dataset.seen = 'yes';
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    shots.forEach((s) => io.observe(s));
  }

  // ─── Параллакс ───
  //
  // Только при точном указателе: на тач-экране «движения курсора» не бывает,
  // а слушатель на каждое касание — расход без результата.
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const movers = shots.filter((s) => parseFloat(getComputedStyle(s).getPropertyValue('--par')) > 0);
  if (still || !fine || !movers.length) return;

  let px = 0;
  let py = 0;
  let ticking = false;

  function apply() {
    ticking = false;
    movers.forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.bottom < 0 || b.top > window.innerHeight) return;
      // От центра снимка, нормировано по половине окна: у края экрана
      // смещение выходит на полную силу и дальше не растёт.
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      const nx = Math.max(-1, Math.min(1, (px - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (py - cy) / (window.innerHeight / 2)));
      el.style.setProperty('--px', nx.toFixed(3));
      el.style.setProperty('--py', ny.toFixed(3));
    });
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX;
      py = e.clientY;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    },
    { passive: true }
  );

  // Курсор ушёл из окна — снимок возвращается на место сам, переходом.
  document.addEventListener('pointerleave', () => {
    movers.forEach((el) => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    });
  });
}
