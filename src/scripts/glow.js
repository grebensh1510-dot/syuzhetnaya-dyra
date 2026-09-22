// Тёплое пятно под курсором на карточках и вариантах ответа.
//
// Координаты курсора CSS сам не знает, поэтому их пишет сюда скрипт — но
// только там, где курсор вообще есть. На тач-экране слушателей не заводим
// совсем: там это не эффект, а лишние события на каждое касание.
//
// Один слушатель на контейнер, а не на каждую карточку: карточек шесть, а
// вариантов в чеке — четыре на вопрос, и слушатель на каждом даёт десятки
// подписок ради одного и того же расчёта.

export function mountGlow(containerSelector, itemSelector) {
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.querySelector(containerSelector);
  if (!root || root.dataset.glow) return;
  root.dataset.glow = 'yes';

  let queued = null;
  let ticking = false;

  root.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      const item = e.target.closest(itemSelector);
      if (!item) return;

      // Копим последнее событие и пишем стиль раз в кадр: pointermove
      // приходит чаще, чем экран успевает перерисоваться.
      queued = { item, x: e.clientX, y: e.clientY };
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        if (!queued) return;
        const { item: el, x, y } = queued;
        queued = null;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${x - r.left}px`);
        el.style.setProperty('--my', `${y - r.top}px`);
      });
    },
    { passive: true }
  );
}
