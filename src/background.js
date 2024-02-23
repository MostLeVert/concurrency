const currencyMap = {
  "$": "usd",
  "€": "eur",
  "£": "gbp",
  "¥": "jpy",
  "₹": "inr",
};

// Listener for context menu click
chrome.contextMenus.onClicked.addListener(genericOnClick);

// Function to handle click on context menu
async function genericOnClick(info) {
  let to = "usd";
  chrome.storage.local.get(['defaultCurrency'], async function(result) {
    // Correctly access defaultCurrency from result, with fallback to "usd"
    to = result.defaultCurrency || "usd";

    try {
      // Get selected text and remove commas
      let selection = (info.selectionText).replace(/,/g, "");

      // Find matching currency symbols
      const matches = selection.match(/[$€£¥₹]/g);

      // Determine the currency symbol, defaulting to "$"
      const fromSymbol = matches && matches.length > 0 ? matches[0] : "$";

      // Look up currency code using the map
      const fromCode = currencyMap[fromSymbol];

      // Remove currency symbol from selection
      selection = selection.replace(/[$€£¥₹]/g, "");

      // Parse the numeric value
      const amount = Number(selection);

      // Validate the parsed number
      if (isNaN(amount)) {
        console.log("Selected text is not a number.");
        return;
      }

      // Perform currency conversion
      const converted = await getCurrency(fromCode, to, amount);
      if (converted) {
        // Save conversion result and open a new tab with the result
        chrome.storage.local.set({
          currencyFromAmount: amount,
          currencyFrom: fromCode,
          currencyToAmount: converted,
          currencyTo: to,
        }, function() {
          chrome.tabs.create({ url: chrome.runtime.getURL("result.html") });
        });
      } else {
        console.log("Failed to convert currency.");
      }
    } catch (error) {
      console.error("Error in genericOnClick:", error);
    }
  });
}

// Listener for the installation event to create a context menu
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Convert %s",
    contexts: ["selection"],
    id: "selection",
  });
});

// Function to fetch conversion rate and calculate converted amount
async function getCurrency(from, to, amount) {
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`);
    const data = await response.json();
    const rate = Number(data[to]);
    const result = amount * rate;
    return result.toFixed(2).toString(); // Adjusted to 2 decimal places for currency
  } catch (error) {
    console.error("Error in getCurrency:", error);
    return null; // Return null to indicate failure
  }
}
