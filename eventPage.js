// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info) {
    console.log(info.selectionText);
}

chrome.runtime.onInstalled.addListener(function () {
    let context = "selection";
    let title = "Convert %s";
    chrome.contextMenus.create({
        title: title,
        contexts: [context],
        id: context
    });
    // Intentionally create an invalid item, to show off error checking in the
    // create callback.
    chrome.contextMenus.create(
        { title: 'Oops', parentId: 999, id: 'errorItem' },
        function () {
            if (chrome.runtime.lastError) {
                console.log('Got expected error: ' + chrome.runtime.lastError.message);
            }
        }
    );
});
