// Essence of Freedom — shared site behavior

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Hamburger menu ---- */
  var hamburger = document.getElementById('hamburger-btn');
  var nav = document.getElementById('site-nav');

  if (hamburger && nav) {
    var closeSubmenus = function () {
      nav.querySelectorAll('.nav-item.is-open').forEach(function (item) {
        item.classList.remove('is-open');
        var toggle = item.querySelector('.submenu-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    };

    var closeNav = function () {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      closeSubmenus();
    };

    var openNav = function () {
      nav.classList.add('is-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    hamburger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close menu when a nav link is tapped (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Reset state if the viewport grows back to desktop width
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---- Nav submenu toggle (tap, for touch/mobile; desktop also has it on hover via CSS) ---- */
  document.querySelectorAll('.submenu-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.nav-item');
      if (!item) return;
      var isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* ---- Image placeholder fallback ----
     Each placeholder wraps an <img> pointed at /images/<filename>.
     If the real file isn't there yet (404), show the labeled
     placeholder block instead. Drop the real file in with the
     same filename later and it swaps in automatically. */
  document.querySelectorAll('.img-ph').forEach(function (box) {
    var img = box.querySelector('img');
    if (!img) return;

    var markBroken = function () { box.classList.add('is-broken'); };
    var markLoaded = function () { box.classList.remove('is-broken'); };

    img.addEventListener('error', markBroken);
    img.addEventListener('load', markLoaded);

    // If the image already failed before this listener attached
    if (img.complete && img.naturalWidth === 0) {
      markBroken();
    }
  });

  /* ---- Logo marquee: pause on tap (touch devices) ----
     :hover already pauses on pointer devices via CSS; this adds
     the same behavior for touch, since touch has no hover state. */
  document.querySelectorAll('.logo-track').forEach(function (track) {
    track.addEventListener('touchstart', function () {
      track.classList.add('is-paused');
    }, { passive: true });
    track.addEventListener('touchend', function () {
      track.classList.remove('is-paused');
    });
  });

});
