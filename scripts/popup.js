document.getElementById("close").addEventListener("click", function() {
    chrome.runtime.sendMessage({ action: 'disableContentScript' });

    // close pop up
    window.close();
});
