// Прогресс по героям. Пока живёт в браузере: аккаунтов и бэкенда нет,
// и это записано в PRODUCT.md как открытое решение. Всё чтение обёрнуто
// в try — приватное окно и запрет на данные сайта не должны ломать экран.

const KEY = 'dyra:ionych:heroes';

export function readDone() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function markDone(heroId) {
  try {
    const done = new Set(readDone());
    done.add(heroId);
    localStorage.setItem(KEY, JSON.stringify([...done]));
  } catch {
    // Прогресс не сохранился — не повод прерывать занятие.
  }
}

export function resetDone() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

export function allDone(order) {
  const done = new Set(readDone());
  return order.every((id) => done.has(id));
}
