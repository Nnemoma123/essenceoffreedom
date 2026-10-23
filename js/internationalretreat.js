// Carry My Gifts — International Retreat page behavior

document.addEventListener('DOMContentLoaded', function () {

  var PAGE_URL = 'https://www.essenceoffree.com/internationalretreat';

  /* ---- Copy-to-clipboard buttons (Venmo, Zelle, page link) ---- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var originalText = btn.textContent;
    var resetTimer = null;

    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');

      var markCopied = function () {
        clearTimeout(resetTimer);
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        resetTimer = setTimeout(function () {
          btn.textContent = originalText;
          btn.classList.remove('is-copied');
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(markCopied).catch(function () {
          fallbackCopy(text);
          markCopied();
        });
      } else {
        fallbackCopy(text);
        markCopied();
      }
    });
  });

  function fallbackCopy(text) {
    var temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(temp);
  }

  /* ---- Native share button (hidden if unsupported) ---- */
  var shareBtn = document.getElementById('share-page-btn');
  if (shareBtn) {
    if (navigator.share) {
      shareBtn.addEventListener('click', function () {
        navigator.share({
          title: document.title,
          text: 'Help Nnemoma carry her gifts internationally.',
          url: PAGE_URL
        }).catch(function () { /* user cancelled, no-op */ });
      });
    } else {
      shareBtn.hidden = true;
    }
  }

});
