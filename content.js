/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString, id) {
  const style = document.createElement('style');
  style.id = id
  style.textContent = styleString;
  document.head.append(style);
}

addStyle(`
  .html5-endscreen {
    display: none;
  }
`, "youtube-blocker-endscreen");

addStyle(`
  #related {
    display: none;
  }
`, "youtube-blocker-related");

addStyle(`
  #logo {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
`, "youtube-blocker-logo");

addStyle(`
  #1 {
    margin-top: 50px;
  }
`)

// Inform the background page that
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data.
    var domInfo = {
      related: document.getElementById('youtube-blocker-related').innerHTML.display === 'none',
      endscreen: document.getElementById('youtube-blocker-endscreen').innerHTML.display === 'none',
      logo: document.getElementById('youtube-blocker-logo').innerHTML.opacity === 0.6,
    };

    // Directly respond to the sender (popup),
    // through the specified callback.
    response(domInfo);
  }
});
