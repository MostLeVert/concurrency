const currencyMap = {
  $: "usd",
  "€": "eur",
  "£": "gbp",
  "¥": "jpy",
  "₹": "inr",
  Ξ: "eth",
  "฿": "btc",
  "₿": "btc",
};

chrome.contextMenus.onClicked.addListener(genericOnClick);

async function genericOnClick(info) {
  let to = "usd";
  chrome.storage.local.get(["defaultCurrency"], async function (result) {
    to = result.defaultCurrency || "usd";
    try {
      let currencySymbolRegex = /[$€£¥₹Ξ฿₿]/g;
      let selection = info.selectionText.replace(/,/g, "");
      const matches = selection.match(currencySymbolRegex);
      const fromSymbol = matches && matches.length > 0 ? matches[0] : "$";
      const fromCode = currencyMap[fromSymbol];
      selection = selection.replace(currencySymbolRegex, "");
      const amount = Number(selection);
      if (isNaN(amount)) {
        console.log("Selected text is not a number.");
        return;
      }
      const converted = await getCurrency(fromCode, to, amount);
      if (converted) {
        chrome.storage.local.set(
          {
            currencyFromAmount: amount,
            currencyFrom: fromCode,
            currencyToAmount: converted,
            currencyTo: to,
          },
          function () {
            chrome.tabs.create({ url: chrome.runtime.getURL("result.html") });
          },
        );
      } else {
        console.log("Failed to convert currency.");
      }
    } catch (error) {
      console.error("Error in genericOnClick:", error);
    }
  });
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: `Convert %s to default`,
    contexts: ["selection"],
    id: "selection",
  });
});

async function getCurrency(from, to, amount) {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`,
    );
    const data = await response.json();
    const rate = Number(data[to]);
    const result = amount * rate;
    return result.toFixed(9).toString(); // Adjusted to 2 decimal places for currency
  } catch (error) {
    console.error("Error in getCurrency:", error);
    return null; // Return null to indicate failure
  }
}
