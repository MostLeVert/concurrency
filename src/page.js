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
    let dataMod = [];
    for (let key in data) {
      dataMod.push(key);
    }
    renderList(dataMod.slice(0, 10));
    searchResultsES.addEventListener("input", (e) => {
      search(e.target.value, dataMod);
    });
  }

  function search(searchQuery, dataMod) {
    const matches = dataMod
      .filter((item) => item.toLowerCase().includes(searchQuery))
      .sort((a, b) => {
        if (a.toLowerCase() === searchQuery) return -1;
        if (b.toLowerCase() === searchQuery) return 1;
        return 0;
      })
      .slice(0, 10);
    renderList(matches);
  }

  function renderList(list) {
    document.querySelectorAll(".search-result").forEach((e) => {
      e.parentNode.removeChild(e);
    });
    list.forEach((li) => {
      const selectionOption = document.createElement("div");
      selectionOption.innerText = li;
      selectionOption.classList.add("search-result");
      selectionOption.addEventListener("click", (e) => {
        handleCurrencyClick(e);
      });
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
