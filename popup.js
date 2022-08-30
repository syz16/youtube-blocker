async function showHideRelated () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (showRelatedToggle.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showRelated,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideRelated,
    });
  }
}

async function showHideEndscreen() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (showEndscreenToggle.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showEndscreen,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideEndscreen,
    });
  }
}

showHideRelated();

// When the toggle is checked
let showRelatedToggle = document.getElementById("showRelatedToggle");
showRelatedToggle.addEventListener("change", showHideRelated);

let showEndscreenToggle = document.getElementById("showEndscreenToggle");
showEndscreenToggle.addEventListener("change", showHideEndscreen);

// The body of this function will be executed as a content script inside the
// current page
function showRelated() {
  const style = document.getElementById("youtube-blocker-related");
  style.innerHTML = `
    #related {
      display: block;
    }
  `
}

function hideRelated() {
  const style = document.getElementById("youtube-blocker-related");
  style.innerHTML = `
    #related {
      display: none;
    }
  `
}

function showEndscreen() {
  const style = document.getElementById("youtube-blocker-endscreen");
  style.innerHTML = `
    .html5-endscreen {
      display: block;
    }
  `
}

function hideEndscreen() {
  const style = document.getElementById("youtube-blocker-endscreen");
  style.innerHTML = `
    .html5-endscreen {
      display: none;
    }
  `
}
