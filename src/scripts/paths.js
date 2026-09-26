// Внутренние адреса сайта — единственное место, где записано, куда он положен.
//
// Сайт лежит то в корне домена, то в подпапке: на GitHub Pages проектный
// сайт открывается по адресу /syuzhetnaya-dyra/, и ведущий слеш там уводит
// в корень чужого домена. Поэтому ни один адрес в проекте не записан от
// корня руками — все проходят через to() и asset().
//
// Корень подставляет Astro из base в конфиге: '/' или '/syuzhetnaya-dyra/'.
//
// Отдельный случай — предпросмотр (PUBLIC_PREVIEW=1). Там все страницы лежат
// одним уровнем: ionych-dyra.html, ionych-dosye-starcev.html. Не из любви к
// плоскому — иначе на страницах разной глубины адрес одной и той же таблицы
// стилей записан по-разному («./_astro/…» против «../../_astro/…»), и при
// переходе лепестками ссылка успевает разрешиться от старого адреса: новая
// страница открывается без стилей. Один уровень — один и тот же адрес у всех.

const PREVIEW = import.meta.env.PUBLIC_PREVIEW === '1';
const BASE = import.meta.env.BASE_URL || '/';

// Корень предпросмотра считается от адреса самого бандла: он лежит в
// <корень>/astro/, значит на уровень вверх — корень. Лениво и только в
// браузере: на сборке этот модуль выполняется в Node, где import.meta.url —
// путь к файлу на диске сборочной машины.
let previewRoot = '';
function root() {
  if (!previewRoot) {
    // @vite-ignore — адрес обязан разрешаться в браузере, а не на сборке:
    // в этом весь смысл, иначе корень был бы зашит в бандл.
    previewRoot = import.meta.env.DEV
      ? '/'
      : new URL(/* @vite-ignore */ '../', import.meta.url).href;
  }
  return previewRoot;
}

/** Адрес страницы сайта: to('ionych/dyra/'), to('') — главная. */
export function to(path) {
  const clean = String(path).replace(/^\/+/, '');

  // На сборке — всегда обычный адрес. Плоские имена предпросмотра проставляет
  // scripts/build-preview.mjs уже по готовым файлам; посчитать их здесь
  // нельзя — корень взялся бы от папки сборки, и в разметку попал бы
  // file:///C:/…, то есть адрес машины, на которой собирали.
  if (!PREVIEW || import.meta.env.SSR) return BASE + clean;

  const [rest, hash] = clean.split('#');
  const [p, q] = rest.split('?');
  const flat = p.replace(/\/+$/, '').replace(/\//g, '-');
  const file = flat ? `${flat}.html` : 'index.html';
  return root() + file + (q ? `?${q}` : '') + (hash ? `#${hash}` : '');
}

/** Адрес файла из public: asset('brand/logo-mark.png'). */
export function asset(path) {
  return BASE + String(path).replace(/^\/+/, '');
}
