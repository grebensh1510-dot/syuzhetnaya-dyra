// Запасное лепестковое поле на 2D-канвасе. Тот же интерфейс, что у
// WebGL-версии, — включается там, где WebGL недоступен или дорог.

const WINE_DEEP = [63, 14, 20];
const WINE = [107, 27, 36];
const BLUSH = [240, 207, 218];

function mix(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function rgba(c, alpha) {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

class Petal {
  constructor(x, y, h, ambient) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.ambient = ambient;
    this.depth = Math.random();
    this.scale = 0.45 + this.depth * 0.85;
    this.vy = (90 + Math.random() * 160) * (0.55 + this.depth * 0.7);
    this.vx = (Math.random() - 0.5) * 130;
    this.swayAmp = 14 + Math.random() * 30;
    this.swayFreq = 0.9 + Math.random() * 1.5;
    this.rot = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 2.1;
    this.turn = Math.random() * Math.PI * 2;
    this.turnSpeed = 1.4 + Math.random() * 2.2;
    this.t = Math.random() * 10;
    this.life = 0;
    this.maxLife = ambient ? Infinity : 4 + Math.random() * 3;
  }

  step(dt, wind) {
    this.t += dt;
    this.life += dt;
    this.rot += this.spin * dt;
    this.turn += this.turnSpeed * dt;
    this.y += this.vy * dt;
    this.x +=
      (this.vx + wind * (0.3 + this.depth)) * dt * 0.35 +
      Math.sin(this.t * this.swayFreq) * this.swayAmp * dt;
    this.vx *= 0.985;
    if (this.ambient && this.y - 60 > this.h) {
      this.y = -60;
      return true;
    }
    return this.y - 60 < this.h && this.life < this.maxLife;
  }

  draw(ctx) {
    // Псевдо-3D переворот: никогда не схлопывается в ноль, иначе мигает.
    const flip = Math.max(0.22, Math.abs(Math.cos(this.turn)));
    const face = (Math.cos(this.turn) + 1) / 2;
    const size = 13 * this.scale;
    const fade = this.ambient ? 1 : Math.min(1, (this.maxLife - this.life) / 1.1);
    const alpha = (0.35 + this.depth * 0.55) * fade;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.scale(flip, 1);

    const grad = ctx.createLinearGradient(0, -size, 0, size * 1.4);
    grad.addColorStop(0, rgba(mix(WINE_DEEP, WINE, face), alpha));
    grad.addColorStop(1, rgba(mix(WINE, BLUSH, face), alpha));

    ctx.beginPath();
    ctx.moveTo(0, -size * 1.15);
    ctx.bezierCurveTo(size * 1.25, -size * 0.5, size * 0.95, size * 0.95, 0, size * 1.35);
    ctx.bezierCurveTo(-size * 0.95, size * 0.95, -size * 1.25, -size * 0.5, 0, -size * 1.15);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }
}

export function createPetalField2D(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let petals = [];
  let raf = null;
  let last = 0;
  let wind = 0;
  let ambientCount = 0;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener('resize', size);

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    petals = petals.filter((p) => {
      const alive = p.step(dt, wind);
      if (alive) p.draw(ctx);
      return alive;
    });

    if (!petals.length) {
      raf = null;
      canvas.dataset.on = 'false';
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (raf) return;
    canvas.dataset.on = 'true';
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  return {
    kind: '2d',

    setAmbient(count) {
      ambientCount = count;
      while (petals.filter((p) => p.ambient).length < count) {
        petals.push(
          new Petal(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            window.innerHeight,
            true
          )
        );
      }
      if (count > 0) start();
    },

    setWind(v) {
      wind = v;
    },

    burst(x, y, onCovered) {
      let made = 0;
      const spawn = () => {
        for (let i = 0; i < 7 && made < 90; i += 1, made += 1) {
          const p = new Petal(x, y, window.innerHeight, false);
          p.vx = (Math.random() - 0.5) * 520;
          p.vy = -140 + Math.random() * 420;
          petals.push(p);
        }
        if (made < 90) setTimeout(spawn, 30);
      };
      spawn();
      start();
      if (typeof onCovered === 'function') setTimeout(onCovered, 560);
    },

    dispose() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    },
  };
}
