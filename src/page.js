const currencyToAmountElement = document.getElementById("currency-to-amount");
const currencyToElement = document.getElementById("currency-to");
const currencyFromElement = document.getElementById("currency-from");
const currencyFromAmountElement = document.getElementById("currency-from-amount")

chrome.storage.local.get(['currencyFromAmount', 'currencyFrom', 'currencyTo', 'currencyToAmount'], function (result) {
    currencyToAmountElement.innerText = result.currencyToAmount;
    currencyToElement.innerText = result.currencyTo;
    currencyFromElement.innerText = result.currencyFrom;
    currencyFromAmountElement.innerText = result.currencyFromAmount;
})