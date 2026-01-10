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
new WOW().init();
 const counter = document.getElementById("consultCounter");
    const section = document.getElementById("whyUs");

    let started = false;

    function startCounter() {
        let current = 1;
        const target = 50;
        const duration = 1200;
        const startTime = performance.now();

        function update(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            counter.textContent = Math.floor(progress * (target - 1)) + 1;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.75 &&
            rect.bottom >= 0
        );
    }

    window.addEventListener("scroll", () => {
        if (isInViewport(section) && !started) {
            started = true;
            startCounter();
        }
    });