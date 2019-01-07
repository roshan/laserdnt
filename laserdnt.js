var blacklistedHosts = new Set([]);

function prepBlacklist(hostString) {
  return new Set(hostString.split(',').map(x => x.trim()));
}

chrome.storage.sync.get({
  laserDntHosts: ''
}, function(items) {
  blacklistedHosts = prepBlacklist(items.laserDntHosts);
  console.log("Loaded blacklist: " + Array.from(blacklistedHosts.values()));
});
