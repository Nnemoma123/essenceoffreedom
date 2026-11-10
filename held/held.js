/* Held: soft reveals and the FAQ accordion. No dependencies. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
  }

  if (reduce || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (var i = 0; i < items.length; i++) io.observe(items[i]);
    // Safety net: never leave content hidden if something goes wrong.
    window.setTimeout(function () {
      if (!document.querySelector('.rv.in')) showAll();
    }, 4000);
  }

  // FAQ accordion: native buttons, so Enter and Space work.
  var qs = document.querySelectorAll('.faq-q');
  for (var j = 0; j < qs.length; j++) {
    qs[j].addEventListener('click', function () {
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', open ? 'false' : 'true');
      this.parentNode.parentNode.classList.toggle('open', !open);
    });
  }
})();
