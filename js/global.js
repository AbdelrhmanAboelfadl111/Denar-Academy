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
document.querySelectorAll('.splide').forEach(slider => {
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
}

