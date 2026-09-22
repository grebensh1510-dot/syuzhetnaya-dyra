// Тест-дыра № 2: разминка на короткий ответ и сопоставление.
// Сопоставление работает тапом — сначала позиция, потом вариант.
// Перетаскивания нет нигде: на телефоне оно не работает, а дублировать
// один и тот же жест двумя способами значит чинить то, что не сломано.

import { readDone } from './progress.js';

const ORDER = ['ivan', 'vera', 'kotik', 'starcev', 'sluga', 'final'];

// Проверка не придирается к регистру, ё и окончаниям: «эпосъ», «Эпос»,
// «эпическ» — всё это один и тот же ответ ученика, который помнит суть.
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я]/gi, '')
    .trim();
}

function matches(given, expected) {
  const g = normalize(given);
  if (!g) return false;
  return expected.some((e) => {
    const x = normalize(e);
    const stem = x.slice(0, Math.max(4, x.length - 2));
    return g === x || g.startsWith(stem);
  });
}

function mountHint() {
  const hint = document.querySelector('[data-hint]');
  if (!hint) return;
  const done = new Set(readDone());
  const left = ORDER.filter((id) => !done.has(id));
  if (!left.length) {
    hint.textContent = 'Все герои в сюжетном чеке закрыты — можно проверять себя начисто.';
    hint.dataset.state = 'ready';
  } else {
    hint.innerHTML = `Сюжетный чек пройден не весь: осталось ${left.length} из ${ORDER.length}. Это не запрещает тест — но ловушки здесь рассчитаны на то, что досье уже разобрано. <a class="done__link" href="/ionych/check/">Вернуться к чеку</a>`;
    hint.dataset.state = 'partial';
  }
}

function mountWarmup() {
  const root = document.querySelector('.warm');
  if (!root) return;

  const rows = [...root.querySelectorAll('.warm__row')];
  const check = root.querySelector('.warm__check');
  const skip = root.querySelector('.warm__skip');
  const count = root.querySelector('[data-warm-count]');

  // Счётчик считает заполненные поля, а не верные: до проверки правильность
  // не известна, и обещать её счётчиком нельзя.
  function recount() {
    if (!count) return;
    const filled = rows.filter((r) => r.querySelector('.warm__input').value.trim()).length;
    count.textContent = `Отвечено ${filled} из ${rows.length}`;
    count.dataset.full = filled === rows.length ? 'true' : 'false';
  }

  function verdictFor(row) {
    const input = row.querySelector('.warm__input');
    const out = row.querySelector('.warm__verdict');
    const expected = row.dataset.answers.split('|');
    const ok = matches(input.value, expected);
    row.dataset.state = ok ? 'right' : 'wrong';
    out.textContent = ok ? 'верно' : `верно: ${expected[0]}`;
    input.disabled = true;
    // Разбор открывается и на верном ответе: угадать род и знать, почему
    // он такой, — разные вещи, а на экзамене спросят второе.
    const why = row.querySelector('.warm__why');
    if (why) why.hidden = false;
    return ok;
  }

  check?.addEventListener('click', () => {
    rows.forEach(verdictFor);
    check.disabled = true;
    check.textContent = 'Проверено';
    document.querySelector('.match')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  skip?.addEventListener('click', () => {
    root.dataset.skipped = 'yes';
    document.querySelector('.match')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  rows.forEach((row, i) => {
    const input = row.querySelector('.warm__input');
    input?.addEventListener('input', recount);
    input?.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const next = rows[i + 1]?.querySelector('.warm__input');
      if (next) next.focus();
      else check?.click();
    });
  });

  // Браузер может вернуть введённое при возврате «назад» — счёт должен
  // совпадать с тем, что в полях, а не начинаться с нуля.
  recount();
}

function mountMatching() {
  const root = document.querySelector('.match');
  if (!root) return;

  const task = window.__TASK__;
  const answer = JSON.parse(root.dataset.answer);
  const slots = [...root.querySelectorAll('.slot')];
  const banks = [...root.querySelectorAll('.bank')];
  const cells = [...root.querySelectorAll('[data-blank]')];
  const count = root.querySelector('[data-match-count]');
  const check = root.querySelector('.match__check');
  const verdict = root.querySelector('.match__verdict');

  const picked = {};
  let active = null;

  function paint() {
    slots.forEach((s) => {
      const key = s.dataset.key;
      const val = picked[key];
      s.dataset.state = active === key ? 'active' : val ? 'filled' : 'empty';
      const pickEl = s.querySelector('[data-pick]');
      if (val) {
        const label = task.right.find((r) => r.key === val)?.label || '';
        pickEl.textContent = `${val} · ${label}`;
      } else {
        pickEl.textContent = active === key ? 'выберите вариант ниже' : 'выбрать';
      }
      s.setAttribute('aria-expanded', active === key ? 'true' : 'false');
    });

    banks.forEach((b) => {
      const used = Object.values(picked).includes(b.dataset.key);
      b.dataset.state = used ? 'used' : 'free';
    });

    // Бланк: в клетке либо цифра, либо прочерк. Пустая клетка — это тоже
    // состояние задания, и она должна быть видна как пустая.
    cells.forEach((c) => {
      const val = picked[c.dataset.blank];
      c.textContent = val || '—';
      c.dataset.state = val ? 'filled' : 'empty';
    });

    const filled = Object.keys(picked).length;
    if (count) {
      count.textContent = `Заполнено ${filled} из ${task.left.length}`;
      count.dataset.full = filled === task.left.length ? 'true' : 'false';
    }
    check.disabled = filled !== task.left.length;
  }

  slots.forEach((s) => {
    s.addEventListener('click', () => {
      const key = s.dataset.key;
      if (picked[key]) {
        delete picked[key];
        active = key;
      } else {
        active = active === key ? null : key;
      }
      paint();
    });
  });

  banks.forEach((b) => {
    b.addEventListener('click', () => {
      if (!active) {
        active = task.left.find((l) => !picked[l.key])?.key || null;
        if (!active) return;
      }
      const key = b.dataset.key;
      Object.keys(picked).forEach((k) => {
        if (picked[k] === key) delete picked[k];
      });
      picked[active] = key;
      active = task.left.find((l) => !picked[l.key])?.key || null;
      paint();
    });
  });

  check.addEventListener('click', () => {
    const rows = root.querySelector('[data-rows]');
    rows.innerHTML = '';
    let allRight = true;

    task.left.forEach((l) => {
      const got = picked[l.key];
      const want = answer[l.key];
      const ok = got === want;
      if (!ok) allRight = false;

      const li = document.createElement('li');
      li.className = 'match__row';
      li.dataset.state = ok ? 'right' : 'wrong';
      const wantLabel = task.right.find((r) => r.key === want)?.label || '';
      // Из разбора — сразу к развороту героя: ошибся на Вере Иосифовне,
      // идёшь читать Веру Иосифовну, а не искать её по колоде заново.
      const toHero = l.hero
        ? `<a class="hero-link" href="/ionych/dosye/${l.hero}/"><span class="hero-link__t">Посмотреть героя в досье</span><span aria-hidden="true">→</span></a>`
        : '';
      li.innerHTML = `
        <p class="match__row-head"><b>${l.key}</b> ${l.label} — ${ok ? 'верно' : 'неверно'}</p>
        ${ok ? '' : `<p class="match__row-fix">Верно: ${want} · ${wantLabel}</p>`}
        <p class="match__row-why">${task.why[l.key]}</p>
        ${toHero}`;
      rows.append(li);
    });

    const extraLabel = task.right.find((r) => r.key === task.extra)?.label || '';
    root.querySelector('[data-extra-text]').textContent = `${task.extra} · ${extraLabel}`;

    verdict.hidden = false;
    verdict.dataset.state = allRight ? 'right' : 'wrong';
    verdict.querySelector('.verdict__word').textContent = allRight ? 'Всё верно' : 'Есть ошибки';

    slots.forEach((s) => (s.disabled = true));
    banks.forEach((b) => (b.disabled = true));
    check.disabled = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    verdict.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });

  root.querySelector('.match__again')?.addEventListener('click', () => {
    window.location.reload();
  });

  paint();
}

export function mountDyra() {
  mountHint();
  mountWarmup();
  mountMatching();
}
