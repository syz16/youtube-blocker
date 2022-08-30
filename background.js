let showRelated = false;
let showEndscreen = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ showRelated: false });
  console.log('Show related videos: false');
  chrome.storage.sync.set({ showEndscreen: false });
  console.log('Show related videos: false');
});
