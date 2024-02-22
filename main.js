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

function getCurrencies(base, to, amount) {
    fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            const rate = Number(data[base][to]);
            const result = amount * rate;
            currencyResultElement.value = result.toFixed(9).toString();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
