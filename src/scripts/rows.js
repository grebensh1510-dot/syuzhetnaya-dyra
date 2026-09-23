// Строки досье: плашка с темой, цитата выезжает по нажатию.
//
// Раскрытие живёт в CSS (grid-template-rows: 0fr → 1fr), здесь только
// состояние: data-open на строке и aria-expanded на кнопке. Так разметка
// без скрипта остаётся читаемой — см. ниже про data-armed.
//
// Строки независимы: открытие одной не закрывает остальные. Человек
// сравнивает «Внешность» с «В финале», и захлопывать первое, когда он
// открыл второе, значит мешать ему работать.

export function mountRows() {
  const root = document.querySelector('[data-spread]');
  if (!root || root.dataset.rows) return;
  root.dataset.rows = 'yes';

  const rows = [...root.querySelectorAll('.spread__row')];
  if (!rows.length) return;

  // Закрытыми строки становятся ТОЛЬКО отсюда. Страница, до которой скрипт
  // не дошёл, обязана показывать все цитаты: досье без цитат бесполезно.
  root.dataset.armed = 'yes';

  rows.forEach((row) => {
    const btn = row.querySelector('[data-row-q]');
    const panel = row.querySelector('[data-row-a]');
    if (!btn || !panel) return;

    const toggle = () => {
      const open = row.dataset.open === 'yes';
      if (open) delete row.dataset.open;
      else row.dataset.open = 'yes';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    };

    btn.addEventListener('click', toggle);
  });
}
