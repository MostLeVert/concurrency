const currencyFromAmountElement = document.getElementById("currency-from-amount");
const currencyFromElement = document.getElementById("currency-from");
const currencyToAmountElement = document.getElementById("currency-to-amount");
const currencyToElement = document.getElementById("currency-to");

document.addEventListener("DOMContentLoaded", writeElementData);

function writeElementData() {
  chrome.storage.local.get([''], function(result) {
    console.log('Value currently is ' + result.key);
  });
  chrome.storage.local.get(['currencyFromAmount', 'currencyFrom', 'currencyToAmount', 'currencyTo'], function(result) {
    currencyFromAmountElement.innerText = result.currencyFromAmount;
    currencyFromElement.innerText = result.currencyFrom;
    currencyToAmountElement.innerText = result.currencyToAmount;
    currencyToElement.innerText = result.currencyTo;
  });
}
