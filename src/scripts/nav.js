// Скользящий овал в шапке.
//
// Овал — единственный, а не по одному на пункт: он переезжает к тому, на
// что навели, и возвращается на активный раздел, когда мышь ушла. Двигаем
// transform и ширину, положение считаем один раз на кадр.

export function mountSlideNav() {
  const list = document.querySelector('[data-slide-nav]');
  if (!list || list.dataset.mounted) return;
  list.dataset.mounted = 'yes';

  const items = [...list.querySelectorAll('[data-slide-item]')];
  const cursor = list.querySelector('[data-slide-cursor]');
  if (!items.length || !cursor) return;

  const home = items.find((el) => el.dataset.current === 'true') || null;

  function moveTo(el, instant) {
    if (!el) {
      cursor.style.opacity = '0';
      return;
    }
    const left = el.offsetLeft;
    const width = el.offsetWidth;
    if (instant) cursor.style.transition = 'none';
    cursor.style.opacity = '1';
    cursor.style.width = `${width}px`;
    cursor.style.transform = `translate3d(${left}px, 0, 0)`;
    if (instant) {
      // Возвращаем переход следующим кадром, иначе он съест и его.
      requestAnimationFrame(() => {
        cursor.style.transition = '';
      });
    }
  }

  items.forEach((el) => {
    el.addEventListener('pointerenter', () => moveTo(el, false));
    el.addEventListener('focus', () => moveTo(el, false));
  });

  list.addEventListener('pointerleave', () => moveTo(home, false));
  list.addEventListener('focusout', (e) => {
    if (!list.contains(e.relatedTarget)) moveTo(home, false);
  });

  // Стартовое положение ставим без анимации: овал не должен приезжать
  // из левого угла при каждой загрузке страницы.
  const settle = () => moveTo(home, true);
  settle();
  window.addEventListener('resize', settle);

  // Шрифты приезжают позже разметки и меняют ширину пунктов.
  if (document.fonts?.ready) document.fonts.ready.then(settle);
}
