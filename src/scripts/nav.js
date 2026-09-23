// Овал в шапке стоит на активном разделе.
//
// Раньше он ездил за курсором: наводишь на «Досье» — овал переезжает туда,
// и на экране два разных сигнала «ты здесь» сразу, один настоящий, другой
// от мыши. Теперь наведение подсвечивается белым (это чистый CSS), а овал
// помечает только тот раздел, в котором человек действительно находится.
//
// Скрипт остался ради одного: поставить овал по месту и держать его там,
// когда ширина пункта меняется — от resize и от доехавших шрифтов.

export function mountSlideNav() {
  const list = document.querySelector('[data-slide-nav]');
  if (!list || list.dataset.mounted) return;
  list.dataset.mounted = 'yes';

  const items = [...list.querySelectorAll('[data-slide-item]')];
  const cursor = list.querySelector('[data-slide-cursor]');
  if (!items.length || !cursor) return;

  const home = items.find((el) => el.dataset.current === 'true') || null;

  function settle() {
    if (!home) {
      cursor.style.opacity = '0';
      return;
    }
    cursor.style.opacity = '1';
    cursor.style.width = `${home.offsetWidth}px`;
    cursor.style.transform = `translate3d(${home.offsetLeft}px, 0, 0)`;
  }

  settle();
  window.addEventListener('resize', settle);

  // Шрифты приезжают позже разметки и меняют ширину пунктов.
  if (document.fonts?.ready) document.fonts.ready.then(settle);
}
