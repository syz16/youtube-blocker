let showRelated = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ showRelated });
  console.log('Show related videos: false');
});
