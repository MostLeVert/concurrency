const searchResultsE = document.getElementById("search-results");
const searchResultsES = document.getElementById("search-results-search");
const currencySelectionEB = document.getElementById("currency-selection");
const currencySelectionEBS = document.getElementById("currency-selection-S");
const correncySelectionEBC = document.getElementById("currency-selection-C");

function toggleElementText(element, textFrom, textTo) {
  element.innerText = element.innerText === textFrom ? textTo : textFrom;
}
function toggleElementDisplay(e) {
  e.style.display = e.style.display === "block" ? "none" : "block";
}

currencySelectionEB.addEventListener("click", () => {
  toggleElementDisplay(searchResultsE);
  toggleElementText(currencySelectionEBS, "▼", "▲");
});
const currencyURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
fetch(currencyURL)
  .then((response) => response.json())
  .then((data) => {
    createData(data);
  })
  .catch(() => {
    statusOutputElement.innerText = "Error fetching data";
  });
function createData(data) {
  for (let key in data) {
    const selectionOption = document.createElement("div");
    selectionOption.innerText = key;
    selectionOption.classList.add("search-result");
    selectionOption.addEventListener("click", (e) => {
      handleCurrencyClick(e);
    });
    searchResultsE.appendChild(selectionOption);
  }
}
function handleCurrencyClick(e) {
  const newDefaultCurrency = e.target.innerText;
  chrome.storage.local.set(
    { defaultCurrency: newDefaultCurrency },
    function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        correncySelectionEBC.innerText = newDefaultCurrency;
        toggleElementDisplay(searchResultsE);
        toggleElementText(currencySelectionEBS, "▼", "▲");
      }
    },
  );
}
