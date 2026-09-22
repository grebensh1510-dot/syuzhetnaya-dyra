// Строки досье проявляются по одной при прокрутке.
//
// Скрытие включается отсюда, а не из вёрстки: страница, до которой скрипт не
// дошёл — не загрузился, упал, отключён, — обязана показывать всё содержимое.
// Поэтому data-armed ставится первым делом, и только он прячет строки.
//
// IntersectionObserver, а не слушатель scroll: браузер сам считает пересечения
// вне главного потока, и на строку не приходится ни одного кадра работы.

export function mountOrbit() {
  const root = document.querySelector('[data-orbit]');
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'yes';

  const rows = [...root.querySelectorAll('[data-orbit-row]')];
  if (!rows.length) return;

  // При отключённой анимации показываем всё сразу: появление по скроллу —
  // это движение, и гасится оно целиком, а не замедляется.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rows.forEach((r) => (r.dataset.in = 'true'));
    return;
  }

  root.dataset.armed = 'yes';

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.dataset.in = 'true';
        // Строка показывается один раз: при обратной прокрутке она не
        // должна мигать заново.
        io.unobserve(e.target);
      });
    },
    // Нижний отступ отрицательный: строка проявляется, когда поднялась в
    // экран настоящим образом, а не краем в самом низу.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
  );

  rows.forEach((r) => io.observe(r));

  // Если строка уже в экране на момент загрузки, наблюдатель сработает сам
  // первым же колбэком — отдельной проверки не нужно.
}
