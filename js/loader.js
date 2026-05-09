/* =========================================
   دينار أكاديمي — Loader Script
   Progress bar reflects real page load %
   ========================================= */

(function () {

  var loader  = document.getElementById('denar-loader');
  var fill    = document.getElementById('lr-fill');
  var pct     = document.getElementById('lr-pct');
  var status  = document.getElementById('lr-status');
  var content = document.getElementById('page-content');

  /* --- Status messages mapped to progress ranges --- */
  var messages = [
    { from: 0,  text: 'جاري التحميل...'  },
    { from: 30, text: 'تحميل الموارد...' },
    { from: 55, text: 'تحميل الدورات...' },
    { from: 80, text: 'تجهيز المحتوى...' },
    { from: 99, text: 'اكتمل التحميل!'   }
  ];

  var currentProgress = 0;
  var targetProgress  = 0;
  var rafId           = null;
  var isComplete      = false;

  /* ============================================
     SCROLL LOCK
     Blocks: mouse wheel, touch drag, keyboard
     arrows / space / page-up / page-down / home / end
     ============================================ */

  var SCROLL_KEYS = { 32:1, 33:1, 34:1, 35:1, 36:1, 37:1, 38:1, 39:1, 40:1 };

  function blockScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  function blockKeyScroll(e) {
    if (SCROLL_KEYS[e.keyCode]) {
      e.preventDefault();
      return false;
    }
  }

  /* Detect passive event support (needed for wheel/touchmove on modern browsers) */
  var passiveOpt = false;
  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: function () { passiveOpt = { passive: false }; }
    }));
  } catch (e) {}

  function lockScroll() {
    window.addEventListener('wheel',     blockScroll,    passiveOpt);
    window.addEventListener('touchmove', blockScroll,    passiveOpt);
    window.addEventListener('keydown',   blockKeyScroll, false);
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    window.removeEventListener('wheel',     blockScroll,    passiveOpt);
    window.removeEventListener('touchmove', blockScroll,    passiveOpt);
    window.removeEventListener('keydown',   blockKeyScroll, false);
    document.body.style.overflow = '';
  }

  lockScroll();

  /* ============================================
     PROGRESS BAR
     ============================================ */

  /* Pick the right status message for current % */
  function getMessage(p) {
    var msg = messages[0].text;
    for (var i = 0; i < messages.length; i++) {
      if (p >= messages[i].from) msg = messages[i].text;
    }
    return msg;
  }

  /* Smoothly animate currentProgress → targetProgress via RAF */
  function animateBar() {
    if (currentProgress >= targetProgress) {
      rafId = null;
      return;
    }
    var diff = targetProgress - currentProgress;
    var step = Math.max(0.25, diff * 0.055);
    currentProgress = Math.min(currentProgress + step, targetProgress);

    var rounded = Math.round(currentProgress);
    fill.style.width   = currentProgress + '%';
    pct.textContent    = rounded + '%';
    status.textContent = getMessage(rounded);

    rafId = requestAnimationFrame(animateBar);
  }

  /* Push target forward — never backwards */
  function setTarget(t) {
    targetProgress = Math.min(Math.max(t, targetProgress), 100);
    if (!rafId) rafId = requestAnimationFrame(animateBar);
  }

  /* ============================================
     REAL PROGRESS TRACKING
     Combines readyState floor + PerformanceResourceTiming ratio
     ============================================ */

  var pollInterval = null;

  function measureProgress() {
    if (isComplete) return;

    var floors = { loading: 5, interactive: 60, complete: 100 };
    var floor  = floors[document.readyState] || 5;
    var resourcePct = floor;

    if (window.performance && performance.getEntriesByType) {
      var entries = performance.getEntriesByType('resource');
      var total   = entries.length;
      var done    = 0;
      for (var i = 0; i < total; i++) {
        if (entries[i].responseEnd > 0) done++;
      }
      if (total > 0) {
        var ratio = done / total;
        resourcePct = Math.min(Math.round(floor + ratio * (95 - floor)), 95);
      }
    }

    setTarget(resourcePct);
  }

  pollInterval = setInterval(measureProgress, 100);

  document.addEventListener('DOMContentLoaded', function () {
    setTarget(60);
  });

  /* ============================================
     HIDE LOADER + UNLOCK SCROLL
     ============================================ */

  function hideLoader() {
    isComplete = true;
    clearInterval(pollInterval);
    setTarget(100);

    var checkDone = setInterval(function () {
      if (currentProgress >= 99.5) {
        clearInterval(checkDone);
        setTimeout(function () {
          loader.classList.add('hidden');
          unlockScroll();
          if (content) content.style.display = 'block';
        }, 450);
      }
    }, 50);
  }

  /* Handle cached / instant loads */
  if (document.readyState === 'complete') {
    setTarget(95);
    setTimeout(hideLoader, 200);
  } else {
    window.addEventListener('load', hideLoader);
  }

})();
