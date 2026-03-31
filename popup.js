document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('redirectToggle');
  
  chrome.storage.sync.get({ redirectEnabled: true }, function(result) {
    toggle.checked = result.redirectEnabled;
  });
  
  toggle.addEventListener('change', function() {
    chrome.storage.sync.set({ redirectEnabled: toggle.checked }, function() {
      console.log('设置已保存:', toggle.checked);
    });
  });
});
