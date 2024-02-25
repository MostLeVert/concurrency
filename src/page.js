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

function main() {
  function getInitData() {
    fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json",
    )
      .then((response) => response.json())
      .then((data) => {
        createData(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  getInitData();

  function createData(data) {
    renderList(Object.entries(data).slice(0, 10));
    searchResultsES.addEventListener("input", (e) => {
      search(e.target.value, data);
    });
  }

  function search(searchQuery, data) {
    const results = Object.entries(data)
      // Filter entries where either key or value matches the search query (case-insensitive)
      .filter(
        ([key, value]) =>
          key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          value.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      // Sort entries to prioritize exact matches of either key or value
      .sort(([keyA, valueA], [keyB, valueB]) => {
        const queryLower = searchQuery.toLowerCase();
        const exactMatchA =
          keyA.toLowerCase() === queryLower ||
          valueA.toLowerCase() === queryLower
            ? -1
            : 0;
        const exactMatchB =
          keyB.toLowerCase() === queryLower ||
          valueB.toLowerCase() === queryLower
            ? 1
            : 0;
        return exactMatchA - exactMatchB || keyA.localeCompare(keyB);
      })
      // Limit to the top 10 results
      .slice(0, 10);

    // Convert the filtered and sorted array back to an object, if needed
    const topResults = results.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    renderList(Object.entries(topResults));
  }

  function renderList(list) {
    // Ensure searchResultsE is correctly defined, pointing to your container for search results
    const searchResultsE = document.getElementById("search-results"); // Example ID, adjust as necessary

    // Clear existing search results
    document.querySelectorAll(".search-result").forEach((e) => e.remove());

    // Iterate over the list of [key, value] pairs
    list.forEach(([key, value]) => {
      const selectionOption = document.createElement("div");
      const selectionOptionDesc = document.createElement("span");
      selectionOptionDesc.innerText = value || "-";
      selectionOptionDesc.classList.add("search-result-desc");
      selectionOption.innerText = key.toUpperCase();
      selectionOption.appendChild(selectionOptionDesc);
      selectionOption.classList.add("search-result");
      selectionOption.addEventListener("click", handleCurrencyClick);
      searchResultsE.appendChild(selectionOption);
    });
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
}
main();
