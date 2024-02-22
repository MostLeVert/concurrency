chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
    const converted = getCurrency('usd', 'cad', Number(info.selectionText))
    chrome.storage.local.set({convertedValue: converted}, function() {
        chrome.tabs.create({url: chrome.runtime.getURL("index.html")});
    })
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Convert %s",
        contexts: ["selection"],
        id: "selection"
    });
});

function getCurrency(base, to, amount) {
    fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            const rate = Number(data[base][to]);
            const result = amount * rate;
            return (result.toFixed(9).toString());
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}