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

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if ('laserDntHosts' in changes) {
    blacklistedHosts = prepBlacklist(changes['laserDntHosts'].newValue);
    console.log("Blacklisted hosts are: " + Array.from(blacklistedHosts.values()));
  } else {
    console.log("Blacklist didn't change");
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var host = new URL(details.url).host;
    console.log("Host is " + host);
  },
  { urls: ["*://*/*"] },
  [ 'blocking', 'requestHeaders' ]
);


