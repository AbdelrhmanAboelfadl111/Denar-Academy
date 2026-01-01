function openPopUp(popupClass) {
    const popup = document.querySelector(`.${popupClass}`);
    if (popup) {
        popup.classList.add("show");
    }
}
function closePopUp(popupClass) {
    const popup = document.querySelector(`.${popupClass}`);
    if (popup) {
        popup.classList.remove("show");
    }
}
function StopClose(BoxCalss) {
    const Box = document.querySelector(`.${BoxCalss}`);
    Box.addEventListener("click",(e) => {
        e.stopPropagation();
    })
}
function slide() {
document.querySelectorAll('.splide:not(.splide2)').forEach(slider => {
  // نحدد الاتجاه بناءً على الكلاس
  const direction = slider.classList.contains('splide-ltr') ? 'ltr' : 'rtl';

  new Splide(slider, {
    type: 'loop',
    direction: direction,
    autoplay: true,
    speed: 1000,
    interval: 2000,
    gap: '20px',
    perPage: 3,
    perMove: 1,
    breakpoints: {
      1200: { perPage: 2, perMove: 1 },
      768: { perPage: 1, perMove: 1, gap: '12px' }
    },
    pauseOnHover: true,
  }).mount();
});
  new Splide('#splide6', {
  type      : 'loop',     // حلقة مستمرة
  perPage   : 2,          // العناصر المعروضة افتراضي
  perMove   : 1,          // يتحرك عنصر واحد
  gap       : '20px',
  autoplay  : true,
  interval  : 2000,
  speed     : 800,
  direction : 'ltr',
  breakpoints: {           // إعدادات الرسبونسف
    1200: { perPage: 2 }, // لو الشاشة أقل من 1200px، عرض 2 عنصر
    992:  { perPage: 2 }, // أقل من 992px، عرض 2 عنصر
    768:  { perPage: 1 }, // أقل من 768px، عرض عنصر واحد
    576:  { perPage: 1 }  // أقل من 576px، عرض عنصر واحد
  }
}).mount();
}

