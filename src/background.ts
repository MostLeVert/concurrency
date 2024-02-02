const formElement = document.getElementById(
    "currency-conversion-form"
) as HTMLFormElement;
const baseCurrencyElement = document.getElementById(
    "currency-type-in"
) as HTMLSelectElement;
const toCurrencyElement = document.getElementById(
    "currency-type-out"
) as HTMLSelectElement;
const currencyAmountElement = document.getElementById(
    "currency-amount"
) as HTMLInputElement;
const currencyResultElement = document.getElementById(
    "currency-result"
) as HTMLSpanElement;

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const base: string = baseCurrencyElement.value.toLowerCase();
    const to: string = toCurrencyElement.value.toLowerCase();
    const amount: number = Number(currencyAmountElement.value);
    getCurrencies(base, to, amount);
});

function getCurrencies(base: string, to: string, amount: number) {
    fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            const rate: number = Number(data[base][to]);
            const result: number = amount * rate;
            currencyResultElement.innerText = result.toFixed(9).toString();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
