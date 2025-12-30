// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
});
// Anchor Link Smooth Scroll with Lenis
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(2, -10 * t)
      });
    }
  });
});
// Start RAF
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


document.addEventListener('wheel', function (e) {
    if (e.target.closest('.pop-up')) {
        e.stopPropagation();
    }
}, { passive: false });

document.addEventListener('touchmove', function (e) {
    if (e.target.closest('.pop-up')) {
        e.stopPropagation();
    }
}, { passive: false });

