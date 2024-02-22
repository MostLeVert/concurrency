chrome.contextMenus.onClicked.addListener(genericOnClick);

async function genericOnClick(info) {
    const from = 'usd';
    const to = 'cad';
    try {
        const amount = Number(info.selectionText);
        if (isNaN(amount)) {
            console.log("Selected text is not a number.");
            return;
        }
        const converted = await getCurrency(from, to, amount);
        if (converted) {
            chrome.storage.local.set({
                currencyFrom: from,
                currencyFromAmount: amount,
                currencyTo: to,
                currencyToAmount: converted,
            }, function () {
                chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
            });
        } else {
            console.log("Failed to convert currency.");
        }
    } catch (error) {
        console.error("Error in genericOnClick:", error);
    }
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Convert %s",
        contexts: ["selection"],
        id: "selection"
    });
});

async function getCurrency(base, to, amount) {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`);
        const data = await response.json();
        const rate = Number(data[base][to]);
        const result = amount * rate;
        return result.toFixed(9).toString();
    } catch (e) {
        return "THERE WAS AN ERROR" + e;
    }
}