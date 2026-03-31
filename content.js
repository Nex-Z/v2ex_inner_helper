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

  function addBingSearchOption(keyword) {
    const searchItemGroups = document.querySelectorAll('.search-item-group');
    if (searchItemGroups.length === 0) return;

    if (document.querySelector('.bing-search-item')) return;

    const bingUrl = `https://cn.bing.com/search?q=site:v2ex.com%20${encodeURIComponent(keyword)}`;

    const bingGroup = document.createElement('div');
    bingGroup.className = 'search-item-group cell';

    const bingLink = document.createElement('a');
    bingLink.href = bingUrl;
    bingLink.target = '_blank';
    bingLink.className = 'search-item bing-search-item';
    bingLink.textContent = `Bing ${keyword}`;

    bingGroup.appendChild(bingLink);

    let googleGroup = null;
    searchItemGroups.forEach(function(group) {
      const link = group.querySelector('a.search-item');
      if (link && link.href.includes('google.com/search')) {
        googleGroup = group;
      }
    });

    if (googleGroup && googleGroup.parentNode) {
      googleGroup.parentNode.insertBefore(bingGroup, googleGroup);
    } else {
      const lastGroup = searchItemGroups[searchItemGroups.length - 1];
      if (lastGroup && lastGroup.parentNode) {
        lastGroup.parentNode.insertBefore(bingGroup, lastGroup.nextSibling);
      }
    }
  }

  function setupSearchBoxObserver() {
    const searchBox = document.querySelector('#search');
    if (!searchBox) return;

    if (searchBox.hasAttribute('data-bing-setup')) return;
    searchBox.setAttribute('data-bing-setup', 'true');

    searchBox.addEventListener('input', function(e) {
      const keyword = e.target.value.trim();
      if (!keyword) return;

      let attempts = 0;
      const maxAttempts = 30;

      const checkDropdown = setInterval(function() {
        attempts++;
        const searchItemGroups = document.querySelectorAll('.search-item-group');

        if (searchItemGroups.length > 0) {
          addBingSearchOption(keyword);
          clearInterval(checkDropdown);
        }

        if (attempts >= maxAttempts) {
          clearInterval(checkDropdown);
        }
      }, 100);
    });
  }

  function handleLinkClick(e) {
    if (!redirectEnabled) return;

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (link.classList.contains('bing-search-item')) return;

    if (href.includes('v2ex.com') && !href.includes('global.v2ex.co')) {
      const targetUrl = href.replace(/v2ex\.com/g, 'global.v2ex.co');
      e.preventDefault();
      e.stopPropagation();
      window.open(targetUrl, link.target || '_self');
    }
  }

  function setupLinkRedirect() {
    document.addEventListener('click', handleLinkClick, true);
  }

  function init() {
    setupSearchBoxObserver();
    setupLinkRedirect();

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          setupSearchBoxObserver();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
