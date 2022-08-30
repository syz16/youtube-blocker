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
  .html5-endscreen {
    display: none;
  }
  #related {
    display: none;
  }
`, "youtube-blocker-related");
