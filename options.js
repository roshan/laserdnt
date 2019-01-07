// Saves options to chrome.storage
function save_options() {
  var hosts = document.getElementById('laser-dnt-hosts').value;

  chrome.storage.sync.set({
    laserDntHosts: hosts
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

  restore_options();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    laserDntHosts: ''
  }, function(items) {
    document.getElementById('laser-dnt-hosts').value = items.laserDntHosts;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
