// Экзамен: разминка на короткий ответ и сопоставление.
// Сопоставление работает тапом — сначала позиция, потом вариант.
// Перетаскивания нет нигде: на телефоне оно не работает, а дублировать
// один и тот же жест двумя способами значит чинить то, что не сломано.

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
    // Достаточно совпадения по корню: хвост слова не проверяем.
    const stem = x.slice(0, Math.max(4, x.length - 2));
    return g === x || g.startsWith(stem);
  });
}

function mountWarmup() {
  const root = document.querySelector('.warm');
  if (!root) return;

  const rows = [...root.querySelectorAll('.warm__row')];
  const check = root.querySelector('.warm__check');
  const skip = root.querySelector('.warm__skip');

  function verdictFor(row) {
    const input = row.querySelector('.warm__input');
    const out = row.querySelector('.warm__verdict');
    const expected = row.dataset.answers.split('|');
    const ok = matches(input.value, expected);
    row.dataset.state = ok ? 'right' : 'wrong';
    out.textContent = ok ? 'верно' : `верно: ${expected[0]}`;
    input.disabled = true;
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
    row.querySelector('.warm__input')?.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const next = rows[i + 1]?.querySelector('.warm__input');
      if (next) next.focus();
      else check?.click();
    });
  });
}

function mountMatching() {
  const root = document.querySelector('.match');
  if (!root) return;

  const task = window.__TASK__;
  const answer = JSON.parse(root.dataset.answer);
  const slots = [...root.querySelectorAll('.slot')];
  const banks = [...root.querySelectorAll('.bank')];
  const digits = root.querySelector('[data-digits]');
  const check = root.querySelector('.match__check');
  const verdict = root.querySelector('.match__verdict');

  const picked = {};
  let active = null;

  function paint() {
    slots.forEach((s) => {
      const key = s.dataset.key;
      const val = picked[key];
      s.dataset.state = active === key ? 'active' : val ? 'filled' : 'empty';
      const pick = s.querySelector('[data-pick]');
      if (val) {
        const label = task.right.find((r) => r.key === val)?.label || '';
        pick.textContent = `${val} · ${label}`;
      } else {
        pick.textContent = active === key ? 'выберите вариант ниже' : 'выбрать';
      }
      s.setAttribute('aria-expanded', active === key ? 'true' : 'false');
    });

    banks.forEach((b) => {
      const used = Object.values(picked).includes(b.dataset.key);
      b.dataset.state = used ? 'used' : 'free';
    });

    const code = task.left.map((l) => picked[l.key] || '—').join(' ');
    digits.textContent = code;
    check.disabled = Object.keys(picked).length !== task.left.length;
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
        // Ничего не выбрано — подсказываем, с чего начать.
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
      li.innerHTML = `
        <p class="match__row-head"><b>${l.key}</b> ${l.label} — ${ok ? 'верно' : 'неверно'}</p>
        ${ok ? '' : `<p class="match__row-fix">Верно: ${want} · ${wantLabel}</p>`}
        <p class="match__row-why">${task.why[l.key]}</p>`;
      rows.append(li);
    });

    const extraLabel = task.right.find((r) => r.key === task.extra)?.label || '';
    root.querySelector('[data-extra-text]').textContent = `${task.extra} · ${extraLabel}`;

    verdict.hidden = false;
    verdict.dataset.state = allRight ? 'right' : 'wrong';
    verdict.querySelector('.verdict__word').textContent = allRight
      ? 'Всё верно'
      : 'Есть ошибки';

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

export function mountExam() {
  mountWarmup();
  mountMatching();
}
