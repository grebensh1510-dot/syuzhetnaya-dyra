// Лепестковое поле на WebGL. Геометрия лепестка строится кодом — никаких
// .glb: параметрическая поверхность с сужением к кончику, продольным
// загибом и поперечной лодочкой, как у настоящего лепестка розы.
//
// Камера перспективная, но подогнана так, что плоскость z=0 совпадает с
// пикселями экрана: burst(x, y) можно звать прямо координатами клика.

import * as THREE from 'three';

const FRONT = 0x9c4050; // лицевая сторона — винный, но не чёрный
const FRONT_DEEP = 0x3f0e14;
const BACK = 0xf0cfda; // изнанка — blush из §2 дизайн-системы

function makePetalGeometry(segU = 14, segV = 10) {
  const pos = [];
  const uvs = [];
  const idx = [];

  for (let i = 0; i <= segU; i += 1) {
    const u = i / segU; // 0 — основание, 1 — кончик
    // Ширина: быстро расходится у основания, сходит на нет к острию.
    const width = Math.sin(Math.pow(u, 0.62) * Math.PI) * 0.58;
    // Продольный загиб — кончик отгибается назад.
    const bend = Math.pow(u, 2.1) * 0.42;

    for (let j = 0; j <= segV; j += 1) {
      const v = (j / segV) * 2 - 1; // -1…1 поперёк
      const x = v * width;
      const y = u * 1.3 - 0.3;
      // Поперечная лодочка: края поднимаются, у кончика распрямляется.
      const cup = Math.pow(Math.abs(v), 1.8) * 0.26 * (1 - u * 0.55);
      const z = cup - bend;
      pos.push(x, y, z);
      uvs.push((v + 1) / 2, u);
    }
  }

  const row = segV + 1;
  for (let i = 0; i < segU; i += 1) {
    for (let j = 0; j < segV; j += 1) {
      const a = i * row + j;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function makeMaterial() {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.62,
    metalness: 0.0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uBack = { value: new THREE.Color(BACK) };
    shader.uniforms.uDeep = { value: new THREE.Color(FRONT_DEEP) };

    shader.vertexShader =
      'varying vec2 vPetalUv;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n  vPetalUv = uv;'
      );

    shader.fragmentShader =
      'varying vec2 vPetalUv;\nuniform vec3 uBack;\nuniform vec3 uDeep;\n' +
      shader.fragmentShader.replace(
        '#include <color_fragment>',
        `#include <color_fragment>
         // Изнанка светлее лица — лепесток «показывает ребро» при перевороте.
         if (!gl_FrontFacing) {
           diffuseColor.rgb = mix(diffuseColor.rgb, uBack, 0.88);
         } else {
           // К основанию цвет уходит в тёмный, к кончику светлеет.
           diffuseColor.rgb = mix(uDeep, diffuseColor.rgb, smoothstep(-0.35, 0.55, vPetalUv.y));
         }`
      );
  };

  return mat;
}

class Grain {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, initial) {
    this.depth = Math.random();
    this.scale = (13 + this.depth * 17) * (0.85 + Math.random() * 0.4);
    this.z = -420 + this.depth * 560;
    this.x = Math.random() * w - w / 2;
    this.y = initial ? Math.random() * h - h / 2 : h / 2 + 60;
    this.vx = 0;
    this.vy = -(26 + Math.random() * 46);
    this.rx = Math.random() * Math.PI * 2;
    this.ry = Math.random() * Math.PI * 2;
    this.rz = Math.random() * Math.PI * 2;
    this.sx = (Math.random() - 0.5) * 1.1;
    this.sy = 0.7 + Math.random() * 1.7;
    this.sz = (Math.random() - 0.5) * 0.9;
    this.swayAmp = 16 + Math.random() * 34;
    this.swayFreq = 0.5 + Math.random() * 0.9;
    this.t = Math.random() * 20;
    this.life = 0;
    this.maxLife = Infinity;
    this.alive = true;
  }

  launch(x, y, w, h) {
    this.reset(w, h, false);
    this.x = x;
    this.y = y;
    this.z = -180 + Math.random() * 300;
    const a = Math.random() * Math.PI * 2;
    const s = 260 + Math.random() * 620;
    this.vx = Math.cos(a) * s;
    this.vy = Math.sin(a) * s * 0.75 + 120;
    this.life = 0;
    this.maxLife = 4.5 + Math.random() * 3;
  }
}

export function createPetalField(canvas, opts = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
  } catch {
    return null;
  }
  if (!renderer.capabilities.isWebGL2 && !renderer.getContext()) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();

  // Камера подогнана под пиксели: на z=0 одна единица мира = один CSS-пиксель.
  const FOV = 45;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 3000);

  scene.add(new THREE.HemisphereLight(0xfff6ec, 0x8c5a52, 1.9));
  const key = new THREE.DirectionalLight(0xfff4e6, 2.1);
  key.position.set(-0.4, 1, 0.75);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf0cfda, 0.55);
  rim.position.set(0.7, -0.4, -0.6);
  scene.add(rim);

  const max = opts.max || (window.innerWidth < 760 ? 150 : 280);
  const geo = makePetalGeometry();
  const mat = makeMaterial();
  const mesh = new THREE.InstancedMesh(geo, mat, max);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.count = 0;
  scene.add(mesh);

  const colors = new Float32Array(max * 3);
  const tint = new THREE.Color();
  for (let i = 0; i < max; i += 1) {
    tint.setHex(FRONT).offsetHSL(0, (Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.14);
    colors[i * 3] = tint.r;
    colors[i * 3 + 1] = tint.g;
    colors[i * 3 + 2] = tint.b;
  }
  mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);

  const dummy = new THREE.Object3D();
  let W = 0;
  let H = 0;
  const grains = [];
  let ambientCount = 0;
  let wind = 0;
  let running = false;
  let raf = null;
  let last = 0;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.position.z = H / 2 / Math.tan((FOV / 2) * (Math.PI / 180));
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;

    let n = 0;
    for (let i = 0; i < grains.length; i += 1) {
      const g = grains[i];
      if (!g.alive) continue;

      g.t += dt;
      g.life += dt;
      g.x += (g.vx + wind * (0.4 + g.depth)) * dt + Math.sin(g.t * g.swayFreq) * g.swayAmp * dt;
      g.y += g.vy * dt;
      g.vx *= 0.975;
      g.vy = Math.max(g.vy - 210 * dt, -(30 + g.depth * 90));
      g.rx += g.sx * dt;
      g.ry += g.sy * dt;
      g.rz += g.sz * dt;

      const gone = g.y < -H / 2 - 120 || g.life > g.maxLife;
      if (gone) {
        if (g.maxLife === Infinity) g.reset(W, H, false);
        else {
          g.alive = false;
          continue;
        }
      }

      const fade =
        g.maxLife === Infinity
          ? 1
          : Math.min(1, (g.maxLife - g.life) / 1.2) * Math.min(1, g.life * 7);

      dummy.position.set(g.x, g.y, g.z);
      dummy.rotation.set(g.rx, g.ry, g.rz);
      dummy.scale.setScalar(g.scale * fade);
      dummy.updateMatrix();
      mesh.setMatrixAt(n, dummy.matrix);
      n += 1;
      if (n >= max) break;
    }

    mesh.count = n;
    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);

    if (n === 0 && ambientCount === 0) {
      running = false;
      raf = null;
      canvas.dataset.on = 'false';
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    canvas.dataset.on = 'true';
    raf = requestAnimationFrame(frame);
  }

  // Экран → мир: (0,0) в левом верхнем углу превращается в центрированные
  // координаты сцены, поэтому burst можно кормить getBoundingClientRect.
  function toWorld(x, y) {
    return { x: x - W / 2, y: H / 2 - y };
  }

  return {
    kind: 'webgl',

    // Титульная сцена: редкий постоянный снег из лепестков (§6.4).
    setAmbient(count) {
      ambientCount = Math.max(0, Math.min(count, max));
      while (grains.filter((g) => g.alive && g.maxLife === Infinity).length < ambientCount) {
        grains.push(new Grain(W, H));
      }
      if (ambientCount > 0) start();
    },

    // Ветер от скролла: страница листается — поток сносит лепестки вбок.
    setWind(value) {
      wind = value;
    },

    // §6.3, три фазы: вылет из точки жеста, экран заметает, подмена сцены.
    burst(x, y, onCovered) {
      const w = toWorld(x, y);
      const wave = Math.min(max - ambientCount, 120);
      let made = 0;

      const spawn = () => {
        for (let i = 0; i < 14 && made < wave; i += 1, made += 1) {
          let g = grains.find((q) => !q.alive);
          if (!g) {
            if (grains.length >= max) break;
            g = new Grain(W, H);
            grains.push(g);
          }
          g.alive = true;
          g.launch(w.x, w.y, W, H);
        }
        if (made < wave) setTimeout(spawn, 26);
      };
      spawn();
      start();

      if (typeof onCovered === 'function') setTimeout(onCovered, 560);
    },

    dispose() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    },
  };
}
