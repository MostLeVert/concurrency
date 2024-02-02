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
    const base: string = currencyTypeIn.value.toLowerCase();
    const to: string = currencyTypeOut.value.toLowerCase();
    const amount: number = Number(currencyAmount.value);
    getCurrencies(base, to, amount);
});

function getCurrencies(base: string, to: string, amount: number) {
    console.log(base, to, amount)
    console.log(`${base}`);
    fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            const rate: number = Number(data[base][to]);
            const result: number = amount * rate;
            currencyResult.innerText = result.toString();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
