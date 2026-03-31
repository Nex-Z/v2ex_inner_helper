(function() {
  'use strict';

  let redirectEnabled = true;

  chrome.storage.sync.get({ redirectEnabled: true }, function(result) {
    redirectEnabled = result.redirectEnabled;
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync' && changes.redirectEnabled) {
      redirectEnabled = changes.redirectEnabled.newValue;
    }
  });

  function handleLinkClick(e) {
    if (!redirectEnabled) return;

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    const isV2exLink = /(^|[.])v2ex\.com(?![\w.])/.test(href) && !href.includes('global.v2ex.co');

    if (isV2exLink) {
      e.preventDefault();
      e.stopPropagation();
      const targetUrl = href.replace(/www\.v2ex\.com/g, 'global.v2ex.co').replace(/(^|[.])v2ex\.com(?![\w.])/g, 'global.v2ex.co');
      window.open(targetUrl, link.target || '_self');
    }
  }

  document.addEventListener('click', handleLinkClick, true);
})();
