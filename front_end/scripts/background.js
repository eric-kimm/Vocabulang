// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.action === 'disableContentScript') {
//         // Send a message to all active tabs to disable the content script
//         chrome.tabs.query({}, function(tabs) {
//             tabs.forEach(tab => {
//                 chrome.tabs.sendMessage(tab.id, { action: 'disableContentScript' });
//             });
//         });
//     }
// });
