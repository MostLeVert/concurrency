import getCurrency from "./getCurrency.mjs";

const formElement = document.getElementById("currency-conversion-form");
const baseCurrencyElement = document.getElementById("currency-type-in");
const toCurrencyElement = document.getElementById("currency-type-out");
const currencyAmountElement = document.getElementById("currency-amount");
const currencyResultElement = document.getElementById("currency-result");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const base = baseCurrencyElement.value.toLowerCase();
    const to = toCurrencyElement.value.toLowerCase();
    const amount = Number(currencyAmountElement.value);
    getCurrencies(base, to, amount);
});