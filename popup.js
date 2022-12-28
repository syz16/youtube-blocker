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

async function setLogoLink() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (logoLinkToggle.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: logoLinkTrue,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: logoLinkFalse,
    });
  }
}

let showRelatedToggle = document.getElementById("showRelatedToggle");
let showEndscreenToggle = document.getElementById("showEndscreenToggle");
let logoLinkToggle = document.getElementById("logoLinkToggle");

// When the toggle is checked

showRelatedToggle.addEventListener("change", showHideRelated);
showEndscreenToggle.addEventListener("change", showHideEndscreen);
logoLinkToggle.addEventListener("change", setLogoLink);

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

function logoLinkTrue() {
  const style = document.getElementById("youtube-blocker-logo");
  style.innerHTML = `
  #logo {
    pointer-events: auto;
    cursor: pointer;
    opacity: 1;
  }`
}

function logoLinkFalse() {
  const style = document.getElementById("youtube-blocker-logo");
  style.innerHTML = `
  #logo {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }`
}

// Update the relevant fields with the new data.
const setDOMInfo = info => {
  showRelatedToggle.checked = info.related;
  showEndscreenToggle.checked = info.endscreen;
  logoLinkToggle.checked = info.logo;
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id,
      { from: 'popup', subject: 'DOMInfo' },
      // ...also specifying a callback to be called
      //    from the receiving end (content script).
      setDOMInfo);
  });
});
