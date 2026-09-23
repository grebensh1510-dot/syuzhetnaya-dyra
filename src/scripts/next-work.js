// Голосование «что разобрать следующим».
//
// Голос — это цель Метрики и отметка в localStorage. Ни поля ввода, ни
// отправки на сервер: рейтинг произведений собирается без единого адреса.
//
// Один голос на человека. Не из вредности: если дать голосовать сколько
// угодно, один увлечённый одиннадцатиклассник перевесит два десятка честных,
// и рейтинг перестанет что-либо значить. Выбор при этом показывается при
// возврате — человек должен видеть, что его голос учтён.

import { goal } from './metrika.js';

const KEY = 'next-work-vote';

function read() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function write(id) {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // Приватный режим: голос уйдёт в статистику, но при возврате
    // не вспомнится. Это лучше, чем потерять голос.
  }
}

export function mountNextWork() {
  const root = document.querySelector('[data-next-work]');
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'yes';

  const items = [...root.querySelectorAll('[data-work]')];
  const thanks = root.querySelector('[data-nw-thanks]');
  const chosen = root.querySelector('[data-nw-chosen]');
  const mail = root.querySelector('[data-nw-mail]');
  if (!items.length) return;

  function paint(id) {
    items.forEach((b) => {
      const mine = b.dataset.work === id;
      b.dataset.state = id ? (mine ? 'chosen' : 'other') : 'free';
      b.setAttribute('aria-pressed', mine ? 'true' : 'false');
      b.disabled = Boolean(id);
    });
    if (id && thanks) {
      thanks.hidden = false;
      const title = items.find((b) => b.dataset.work === id)?.querySelector('.nw__title');
      if (chosen && title) chosen.textContent = title.textContent;
    }
    if (id && mail) mail.hidden = false;
  }

  items.forEach((b) => {
    b.addEventListener('click', () => {
      const id = b.dataset.work;
      if (read()) return;
      write(id);
      // Имя цели совпадает с id из данных: менять его у произведения,
      // которое уже собирало голоса, нельзя — статистика осиротеет.
      goal(`vote-${id}`);
      paint(id);
    });
  });

  paint(read());
}

/*
 * Плашку показывает тот, кто знает, что человек дошёл до конца: тест-дыра
 * после разбора и чек, когда закрыты все герои. Скрытой она остаётся до
 * этого момента — спрашивать «что дальше» у того, кто ещё не начал, значит
 * получить случайный ответ.
 */
export function revealNextWork() {
  const root = document.querySelector('[data-next-work]');
  if (!root) return;
  root.hidden = false;
  mountNextWork();
}
