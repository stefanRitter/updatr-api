// opens a new tab with Updatr
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('index.html')},
        function (newTab) {}
    );
});
