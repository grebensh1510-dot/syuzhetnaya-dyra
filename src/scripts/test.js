import { mountSheet } from './sheet.js';

// Логика экрана вопроса. Одна на все три варианта: миры отличаются
// оформлением, а не поведением — иначе сравнивать было бы нечестно.

function errWord(n) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'ошибка';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'ошибки';
  return 'ошибок';
}

export function mountTest() {
  const root = document.querySelector('.test');
  if (!root) return;

  const total = Number(root.dataset.total);
  const sections = [...root.querySelectorAll('.q')];
  const done = root.querySelector('.done');
  const foot = root.querySelector('.test__foot');
  const nextBtn = root.querySelector('.next');
  const counter = root.querySelector('[data-counter]');
  const fill = root.querySelector('[data-fill]');
  const cells = [...root.querySelectorAll('.prog-cells__c')];
  const roman = ['I', 'II', 'III', 'IV', 'V'];

  let index = 0;
  let score = 0;
  const wrong = [];

  paintProgress();

  sections.forEach((section) => {
    section.querySelectorAll('.opt').forEach((btn) => {
      btn.addEventListener('click', () => answer(section, btn));
    });
  });

  nextBtn?.addEventListener('click', () => {
    if (index < total - 1) {
      sections[index].hidden = true;
      index += 1;
      sections[index].hidden = false;
      foot.hidden = true;
      paintProgress();
      sections[index].querySelector('.q__trait')?.focus?.();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Конец набора — настоящая смена сцены, и только здесь «Архив»
      // повторяет свой лепестковый переход (§6.3, и §8: не на каждый клик).
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (window.__PETALS__ && !reduce) {
        const r = nextBtn.getBoundingClientRect();
        window.__PETALS__.burst(r.left + r.width / 2, r.top + r.height / 2, finish);
      } else {
        finish();
      }
    }
  });

  root.querySelector('.done__again')?.addEventListener('click', () => {
    window.location.reload();
  });

  function answer(section, btn) {
    if (section.dataset.answered) return;
    section.dataset.answered = 'yes';

    const isRight = btn.dataset.correct === 'true';
    if (isRight) score += 1;
    else {
      const heroId = btn.dataset.hero;
      const correctBtn = section.querySelector('.opt[data-correct="true"]');
      wrong.push({
        chosen: heroId,
        right: correctBtn?.dataset.hero,
      });
    }

    section.querySelectorAll('.opt').forEach((b) => {
      b.disabled = true;
      const right = b.dataset.correct === 'true';
      // Верный вариант, если ученик его не выбрал, помечается не сразу:
      // сначала он должен прочесть «Неверно», иначе ответ выдан до разбора.
      b.dataset.state =
        b === btn ? (right ? 'chosen-right' : 'chosen-wrong') : right ? 'pending' : 'idle';
    });

    // Разбор появляется под выбранным вариантом — там, где сделан выбор,
    // и в порядке из STRUCTURE.md: вердикт → почему → верный ответ → справка.
    const verdict = btn.parentElement.querySelector('.verdict');
    verdict.hidden = false;
    verdict.dataset.state = isRight ? 'right' : 'wrong';
    verdict.querySelector('.verdict__word').textContent = isRight
      ? 'Верно'
      : 'Неверно';

    if (!isRight) {
      // Верный вариант разбирается внутри того же блока, ниже своей ловушки,
      // чтобы ученик сначала увидел, на чём его поймали.
      const correctBtn = section.querySelector('.opt[data-correct="true"]');
      const right = verdict.querySelector('.verdict__right');
      if (correctBtn && right) {
        right.hidden = false;
        right.querySelector('.verdict__right-src').textContent =
          correctBtn.querySelector('.opt__src').textContent.trim();
        right.querySelector('.verdict__right-why').textContent =
          correctBtn.parentElement.querySelector('.verdict__why').textContent;

        // Повторять нужно того героя, на котором ошиблись по существу.
        const go = verdict.querySelector('.verdict__go');
        const rightHero = correctBtn.dataset.hero;
        const heroName = window.__HEROES__?.[rightHero]?.name;
        if (go && heroName) {
          go.dataset.openHero = rightHero;
          go.textContent = `Карточка героя: ${heroName}`;
        }
      }
    }

    foot.hidden = false;
    nextBtn.textContent = index < total - 1 ? 'Следующий вопрос' : 'Посмотреть итог';

    // Разбор бесполезен, если он оказался под липкой кнопкой.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      verdict.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'center',
      });
    });

    if (!isRight) {
      const pending = section.querySelector('.opt[data-state="pending"]');
      const reveal = () => {
        if (pending) pending.dataset.state = 'right';
      };
      if (reduce) reveal();
      else setTimeout(reveal, 750);
    }
  }

  function finish() {
    sections[index].hidden = true;
    foot.hidden = true;
    done.hidden = false;
    done.querySelector('[data-score]').textContent = String(score);

    const list = done.querySelector('[data-errors]');
    list.innerHTML = '';
    if (!wrong.length) {
      const li = document.createElement('li');
      li.className = 'done__clean';
      li.textContent = 'Ошибок нет — ни одной ловушки не сработало.';
      list.append(li);
    } else {
      // Группировка по героям важнее счёта: она говорит, что повторить.
      const byHero = new Map();
      wrong.forEach((w) => {
        const key = w.right;
        byHero.set(key, (byHero.get(key) || 0) + 1);
      });
      byHero.forEach((count, heroId) => {
        const hero = window.__HEROES__?.[heroId];
        const li = document.createElement('li');
        li.className = 'done__err';
        li.innerHTML = `<button type="button" data-open-hero="${heroId}">${
          hero ? hero.name : heroId
        }</button><span>${count} ${errWord(count)}</span>`;
        list.append(li);
      });
    }
    paintProgress(true);
  }

  function paintProgress(complete = false) {
    const shown = complete ? total : index + 1;
    if (counter) {
      counter.textContent = roman.includes(counter.textContent)
        ? roman[shown - 1]
        : String(shown);
    }
    if (fill) fill.style.inlineSize = `${(shown / total) * 100}%`;
    cells.forEach((c, i) => {
      c.dataset.state = complete
        ? 'past'
        : i < index
          ? 'past'
          : i === index
            ? 'now'
            : 'ahead';
    });
  }

  mountSheet();
}

