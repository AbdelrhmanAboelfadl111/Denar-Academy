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
    new Splide('#splide', {
    type      : 'loop',
    direction : 'rtl',

    autoplay  : true,
    speed     : 1000,
    interval  : 2000,
    gap       : '20px',

    perPage   : 3,   // Desktop

    breakpoints: {
        1200: {
        perPage: 2,
        },
        768: {
        perPage: 1,
        gap: '12px',
        }
    },

pauseOnHover: true,
}).mount();

}