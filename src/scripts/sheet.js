// Шторка героя — общий компонент для справки, теста и экзамена.
// Открывает её любой элемент с data-open-hero и всегда возвращает фокус
// туда, откуда её позвали.

export function mountSheet() {
  const sheet = document.querySelector('.sheet');
  if (!sheet || sheet.dataset.mounted) return;
  sheet.dataset.mounted = 'yes';

  const panel = sheet.querySelector('.sheet__panel');
  const nameEl = sheet.querySelector('.sheet__name');
  const roleEl = sheet.querySelector('.sheet__role');
  const fields = sheet.querySelector('.sheet__fields');
  let opener = null;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-hero]');
    if (trigger) {
      opener = trigger;
      open(trigger.dataset.openHero);
      return;
    }
    if (e.target.closest('.sheet__scrim') || e.target.closest('.sheet__close')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sheet.hidden) close();
  });

  function open(heroId) {
    const hero = window.__HEROES__?.[heroId];
    if (!hero) return;

    nameEl.textContent = hero.name;
    roleEl.textContent = hero.aka ? `${hero.role} · «${hero.aka}»` : hero.role;

    fields.innerHTML = '';
    // Поле без подтверждённой цитаты не показывается вовсе.
    Object.entries(hero.fields).forEach(([key, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = key;
      const dd = document.createElement('dd');
      dd.textContent = value;
      fields.append(dt, dd);
    });

    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('is-open'));
    panel.querySelector('.sheet__close')?.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    sheet.classList.remove('is-open');
    document.body.style.overflow = '';
    const after = () => {
      sheet.hidden = true;
      opener?.focus?.();
      opener = null;
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) after();
    else setTimeout(after, 240);
  }
}
