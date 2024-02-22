export default function getCurrency(base, to, amount) {
    fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            const rate = Number(data[base][to]);
            const result = amount * rate;
            return (result.toFixed(9).toString());
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}