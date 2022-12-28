let showRelated = false;
let showEndscreen = false;
let logoLink = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ showRelated: false });
  console.log('Show related videos: false');
  chrome.storage.sync.set({ showEndscreen: false });
  console.log('Show related videos: false');
  chrome.storage.sync.set({ logoLink: false });
  console.log('Logo link to homepage: false');
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});
