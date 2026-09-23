// Колода досье: карточки героев стопкой, активная в центре.
//
// Механика та же, что у стековых каруселей на motion/react: положение
// колоды — дробное число, каждая карточка смещается, поворачивается и
// уменьшается пропорционально расстоянию до центра. Отпускание пальца
// доводит колоду пружиной до ближайшего целого.
//
// Пружина посчитана здесь руками, без библиотеки: три строки интегрирования
// дешевле, чем тащить рантайм ради одного экрана.

const SPRING = { stiffness: 210, damping: 30, mass: 1 };

// Дальше этой карточки веер уже прозрачен — см. fade в paint(). Значит и
// поместить в сцену нужно ровно её, а не всю колоду.
const EDGE = 2;

// Раскладка считается от настоящей ширины сцены и настоящего размера карточки,
// а не от брейкпоинта. Шаг, наклон и масштаб связаны между собой: подобранный
// на глаз шаг 132 на 768 px выносил повёрнутую крайнюю карточку за край, и
// overflow: hidden срезал её вертикально.
function layout(root) {
  const stage = root.querySelector('.deck__stage');
  const card = root.querySelector('.deck__card');
  const w = stage?.clientWidth || window.innerWidth;
  const cw = card?.offsetWidth || 220;
  const ch = card?.offsetHeight || cw * 1.5;

  // До 560 px веера нет: карточка во всю ширину, соседи отъезжают за край и
  // выглядывают полоской — это лента, а не стопка. Наклон и провисание здесь
  // съедают ту самую ширину, ради которой всё и затевалось, поэтому их нет.
  if (w < 560) return { x: cw + 14, y: 0, rot: 0, scale: 0.14, drag: 130 };

  const wide = w >= 1000;
  const rot = wide ? 11 : 9;
  const scale = wide ? 0.11 : 0.1;

  // Габарит крайней видимой карточки: поворот прибавляет к ширине часть
  // высоты, уменьшение — отнимает.
  const a = ((rot * EDGE) / 180) * Math.PI;
  const half = ((cw * Math.cos(a) + ch * Math.sin(a)) / 2) * (1 - EDGE * scale);
  const room = Math.max(40, (w / 2 - half - 6) / EDGE);

  return {
    x: Math.min(wide ? 176 : 132, room),
    y: wide ? 36 : 28,
    rot,
    scale,
    drag: wide ? 240 : 200,
  };
}

export function mountDeck() {
  const root = document.querySelector('[data-deck]');
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'yes';

  const cards = [...root.querySelectorAll('.deck__card')];
  const counter = root.querySelector('[data-deck-counter]');
  const prevBtn = root.querySelector('[data-deck-prev]');
  const nextBtn = root.querySelector('[data-deck-next]');
  const openLink = root.querySelector('[data-deck-open]');
  const total = cards.length;
  if (!total) return;

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let progress = 0;
  let velocity = 0;
  let target = 0;
  let raf = null;
  let geom = layout(root);

  // ─── Раскрытие веера ───
  //
  // spread = 0 — колода лежит стопкой, 1 — раскрыта. Отдельная пружина, и
  // намеренно недогашенная: веер раскрывается с перехлёстом и качается назад,
  // как настоящая колода в руке. На входе — от нуля, при наведении — шире.
  const SPREAD = { stiffness: 150, damping: 15, mass: 1 };
  let spread = reduce() ? 1 : 0;
  let spreadV = 0;
  let spreadTarget = 1;

  // Появление карточек по очереди от центра к краям. Через JS, а не CSS:
  // прозрачность карточек пишет paint() на каждом кадре и перебил бы анимацию.
  const bornAt = performance.now();
  const STAGGER = 70;
  const FADE_MS = 520;

  window.addEventListener('resize', () => {
    geom = layout(root);
    paint();
  });

  // ─── Раскладка стопки ───
  function paint() {
    const now = performance.now();

    cards.forEach((card, i) => {
      let d = (i - progress) % total;
      if (d > total / 2) d -= total;
      if (d < -total / 2) d += total;

      const abs = Math.abs(d);
      // Веер раскрывается: смещение, наклон и провисание идут через spread,
      // а масштаб — нет, иначе на входе карточки были бы одного размера
      // и стопка не читалась бы стопкой.
      const x = d * geom.x * spread;
      const y = abs < 0.05 ? 0 : abs * geom.y * spread;
      const rot = abs < 0.05 ? 0 : d * geom.rot * spread;
      const scale = Math.max(0.5, 1 - abs * geom.scale);
      const fade = abs > total / 2 - 0.5 ? Math.max(0, (total / 2 - abs) * 2) : 1;

      // Своя задержка на карточку: чем дальше от центра, тем позже.
      const born = reduce()
        ? 1
        : Math.max(0, Math.min(1, (now - bornAt - Math.round(abs) * STAGGER) / FADE_MS));

      const lift = card === hovered ? -12 : 0;

      card.style.transform =
        `translate3d(${x}px, ${y + lift}px, 0) rotate(${rot}deg) ` +
        `scale(${scale * (0.94 + 0.06 * born)})`;
      card.style.opacity = String(fade * born);
      card.style.zIndex = String(Math.round(100 - abs * 10));
      card.dataset.active = abs < 0.5 ? 'true' : 'false';
      card.setAttribute('aria-hidden', abs < 0.5 ? 'false' : 'true');
      card.tabIndex = abs < 0.5 ? 0 : -1;
    });

    const active = ((Math.round(progress) % total) + total) % total;
    if (counter) counter.textContent = `${active + 1} / ${total}`;
    if (openLink) {
      const card = cards[active];
      if (card) openLink.href = card.getAttribute('href');
    }
  }

  // ─── Пружина ───
  function tick() {
    const dt = 1 / 60;
    const force = -SPRING.stiffness * (progress - target);
    const damp = -SPRING.damping * velocity;
    velocity += ((force + damp) / SPRING.mass) * dt;
    progress += velocity * dt;

    // Раскрытие веера живёт на своей пружине и со своим покоем.
    const sForce = -SPREAD.stiffness * (spread - spreadTarget);
    const sDamp = -SPREAD.damping * spreadV;
    spreadV += ((sForce + sDamp) / SPREAD.mass) * dt;
    spread += spreadV * dt;

    const spreadRests = Math.abs(spreadV) < 0.002 && Math.abs(spread - spreadTarget) < 0.002;
    const bornDone = performance.now() - bornAt > total * STAGGER + FADE_MS;

    if (
      Math.abs(velocity) < 0.002 &&
      Math.abs(progress - target) < 0.002 &&
      spreadRests &&
      bornDone
    ) {
      progress = target;
      velocity = 0;
      spread = spreadTarget;
      spreadV = 0;
      paint();
      raf = null;
      return;
    }
    paint();
    raf = requestAnimationFrame(tick);
  }

  function settle(to) {
    target = to;
    if (reduce()) {
      progress = to;
      velocity = 0;
      paint();
      return;
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (!raf && !reduce()) raf = requestAnimationFrame(tick);
  }

  // ─── Разъезд под курсором ───
  //
  // Наведение на веер раскрывает его шире, наведение на карточку поднимает
  // её из колоды. Только там, где курсор есть: на тач-экране это лента по
  // одной карточке, и раздвигать нечего.
  let hovered = null;

  if (window.matchMedia('(hover: hover)').matches && !reduce()) {
    const stage = root.querySelector('.deck__stage');

    stage.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'mouse') return;
      spreadTarget = 1.14;
      // Поверхность перехвата лежит НАД карточками, поэтому карточку под
      // курсором ищем сами, а не через e.target.closest.
      const el = document.elementsFromPoint(e.clientX, e.clientY).find((n) =>
        n.classList?.contains('deck__card')
      );
      if (el !== hovered) {
        hovered = el || null;
        wake();
      }
      wake();
    });

    stage.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || dragging) return;
      const el = document.elementsFromPoint(e.clientX, e.clientY).find((n) =>
        n.classList?.contains('deck__card')
      );
      if ((el || null) !== hovered) {
        hovered = el || null;
        wake();
      }
    });

    stage.addEventListener('pointerleave', () => {
      spreadTarget = 1;
      hovered = null;
      wake();
    });
  }

  function go(delta) {
    settle(Math.round(target) + delta);
  }

  // ─── Перетаскивание ───
  let dragging = false;
  let startX = 0;
  let startProgress = 0;
  let lastX = 0;
  let lastT = 0;
  let speed = 0;

  const surface = root.querySelector('.deck__surface');

  surface.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = lastX = e.clientX;
    lastT = performance.now();
    speed = 0;
    startProgress = progress;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    velocity = 0;
    surface.setPointerCapture(e.pointerId);
    surface.dataset.grabbing = 'true';
  });

  surface.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    speed = ((e.clientX - lastX) / dt) * 1000;
    lastX = e.clientX;
    lastT = now;

    progress = startProgress - (e.clientX - startX) / geom.drag;
    paint();
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    surface.dataset.grabbing = 'false';
    try {
      surface.releasePointerCapture(e.pointerId);
    } catch {}

    // Бросок учитывает и пройденное расстояние, и скорость руки,
    // но не даёт улететь дальше трёх карточек за один жест.
    const byDistance = -(lastX - startX) / geom.drag;
    const byVelocity = -speed / 900;
    let shift = Math.round(byDistance + byVelocity);
    shift = Math.max(-3, Math.min(3, shift));
    settle(Math.round(startProgress) + shift);
  }

  surface.addEventListener('pointerup', endDrag);
  surface.addEventListener('pointercancel', endDrag);

  // ─── Клик по карточке ───
  // Соседняя выходит в центр, активная уходит по ссылке на свой разворот.
  // Сначала выбрать героя, потом открыть — два разных жеста на одной цели.
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (Math.abs(lastX - startX) > 6) {
        e.preventDefault(); // это было перетаскивание, а не нажатие
        return;
      }
      const current = ((Math.round(target) % total) + total) % total;

      // Активная карточка — обычная ссылка: переход и морфинг фотографии
      // делает браузер, мешать ему не нужно.
      if (i === current) return;

      e.preventDefault();
      let diff = i - current;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      go(diff);
    });
  });

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      settle(0);
    }
  });

  // Приход по якорю из состава на главной: #vera открывает Веру.
  function fromHash(animated) {
    const hash = window.location.hash.slice(1);
    if (!hash) return false;
    const idx = cards.findIndex((c) => c.dataset.hero === hash);
    if (idx < 0) return false;
    if (animated) {
      settle(idx);
    } else {
      progress = target = idx;
    }
    return true;
  }

  fromHash(false);

  // Смена хеша внутри той же страницы документ не перезагружает, поэтому
  // ссылку с якорем нужно ловить отдельно — иначе она молча ничего не делает.
  window.addEventListener('hashchange', () => fromHash(true));

  paint();
  // Колода приходит стопкой и раскрывается сама — цикл надо запустить.
  wake();
}
