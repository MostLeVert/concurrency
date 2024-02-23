const submitButton = document.getElementById("set-default-currency-button");
const defaultCurrencyInput = document.getElementById(
  "set-default-currency-input",
);
const statusOutput = document.getElementById("status-output");

submitButton.addEventListener("click", function () {
  statusOutput.innerText = "setting value";
  setDefaultCurrency(defaultCurrencyInput.value);
});

function setDefaultCurrency(defaultCurrency) {
  chrome.storage.local.set(
    { defaultCurrency: defaultCurrency },
    function () {
      if (chrome.runtime.lastError) {
        statusOutput.innerText = `Error setting default currency: ${chrome.runtime.lastError}`;
      } else {
        statusOutput.innerText = `Default currency set to ${defaultCurrency}`;
      }
    },
  );
}
