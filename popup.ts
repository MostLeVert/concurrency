const convertButton = document.getElementById(
    "convert-button"
) as HTMLDivElement;
const currencyTypeIn = document.getElementById(
    "currency-type-in"
) as HTMLSelectElement;
const currencyTypeOut = document.getElementById(
    "currency-type-out"
) as HTMLSelectElement;
const currencyAmount = document.getElementById(
    "currency-amount"
) as HTMLInputElement;
const currencyResult = document.getElementById(
    "currency-result"
) as HTMLDivElement;

convertButton.addEventListener("click", () => {
    const base: string = currencyTypeIn.value;
    const to: string = currencyTypeOut.value;
    const amount: number = Number(currencyAmount.value.replace(/[^0-9.]/g, ""));
    getCurrencies(base, to, amount);
});

function getCurrencies(base: string, to: string, amount: number) {
    fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            const rate = data[to];
            const result = amount * rate;
            currencyResult.innerText = String(result);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
