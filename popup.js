let showRelatedToggle = document.getElementById("showRelatedToggle");

async function showHideRelated () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (showRelatedToggle.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showRelatedVideos,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideRelatedVideos,
    });
  }
}

showHideRelated();

// When the toggle is checked
showRelatedToggle.addEventListener("change", showHideRelated);

// The body of this function will be executed as a content script inside the
// current page
function showRelatedVideos() {
  relatedVideos = document.getElementById("related");
  relatedVideos.style.display = "block"
}

function hideRelatedVideos() {
  relatedVideos = document.getElementById("related");
  relatedVideos.style.display = "none"
}
