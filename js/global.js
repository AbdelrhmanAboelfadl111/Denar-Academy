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