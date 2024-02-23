const currencySelectElement = document.getElementById("currencies");
const statusOutputElement = document.getElementById("status-output");

currencySelectElement.addEventListener("input", (e) => {
  const newDefaultCurrency = e.target.value;
  chrome.storage.local.set(
    { defaultCurrency: newDefaultCurrency },
    function () {
      if (chrome.runtime.lastError) {
        statusOutputElement.innerText = `Error setting default currency: ${chrome.runtime.lastError.message}`;
      } else {
        statusOutputElement.innerText = `Default currency set to: ${newDefaultCurrency}`;
      }
      setTimeout(() => {
        statusOutputElement.innerText = "Awaiting interaction...";
      }, 2000);
    },
  );
});

fetch(
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json",
)
  .then((response) => response.json())
  .then((data) => {
    createMenu(data);
  })
  .catch(() => {
    statusOutputElement.innerText = "Error fetching data";
  });
function createMenu(data) {
  for (let key in data) {
    const selectionOption = document.createElement("option");
    selectionOption.value = key;
    selectionOption.innerText = key;
    currencySelectElement.appendChild(selectionOption);
  }
}
