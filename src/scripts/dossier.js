// Досье героя поверх колоды. Панель вылетает из той карточки, по которой
// нажали: перед открытием считаем её прямоугольник и стартуем анимацию
// оттуда — так связь между карточкой и досье видна, а не подразумевается.

let opener = null;

export function mountDossier() {
  const root = document.querySelector('[data-dossier]');
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'yes';

  const panel = root.querySelector('.dossier__panel');
  const closeBtn = root.querySelector('.dossier__close');

  root.addEventListener('click', (e) => {
    if (e.target.closest('.dossier__scrim') || e.target.closest('.dossier__close')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.hidden) close();
  });

  // Фокус не должен уходить за пределы открытого досье.
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('a[href], button:not([disabled])')].filter(
      (el) => el.offsetParent !== null
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  function close() {
    root.classList.remove('is-open');
    document.body.style.overflow = '';
    const after = () => {
      root.hidden = true;
      opener?.focus?.();
      opener = null;
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) after();
    else setTimeout(after, 260);
  }

  root.__close = close;
}

export function openDossier(heroId, fromEl) {
  const root = document.querySelector('[data-dossier]');
  if (!root) return;

  const panels = [...root.querySelectorAll('[data-panel-hero]')];
  const wanted = panels.find((p) => p.dataset.panelHero === heroId);
  if (!wanted) return;

  panels.forEach((p) => {
    p.hidden = p !== wanted;
  });

  opener = fromEl || null;
  root.hidden = false;

  const panel = root.querySelector('.dossier__panel');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (fromEl && !reduce) {
    // Считаем, откуда лететь: из центра карточки в центр панели.
    const from = fromEl.getBoundingClientRect();
    const to = panel.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const scale = Math.max(0.35, Math.min(0.9, from.width / to.width));
    panel.style.setProperty('--fly-x', `${dx}px`);
    panel.style.setProperty('--fly-y', `${dy}px`);
    panel.style.setProperty('--fly-s', String(scale));
  } else {
    panel.style.setProperty('--fly-x', '0px');
    panel.style.setProperty('--fly-y', '0px');
    panel.style.setProperty('--fly-s', '1');
  }

  document.body.style.overflow = 'hidden';
  panel.scrollTop = 0;

  requestAnimationFrame(() => {
    root.classList.add('is-open');
    root.querySelector('.dossier__close')?.focus();
  });
}
