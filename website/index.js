const containerElement = document.getElementById("currencies-container");
const inputElement = document.getElementById("search");

inputElement.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    const currencies = document.querySelectorAll(".currency");
    currencies.forEach((currency) => {
        const currencyText = currency.textContent.toLowerCase();
        if (currencyText.includes(value)) {
            currency.style.display = "block";
        } else {
            currency.style.display = "none";
        }
    });
});

containerElement.innerText = "Loading...";

fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
)
    .then((response) => response.json())
    .then((data) => {
        printData(data);
    })
    .catch((e) => {
        containerElement.innerText = "Error fetching data";
    });

function printData(data) {
    containerElement.innerText = "";
    for (let key in data) {
        const currency = data[key];
        const currencyElement = document.createElement("div");
        currencyElement.classList.add("currency");
        currencyElement.innerHTML = `<p>
        ${key}</br> <span style="color: rgb(100,100,100);">${currency}</span>
        </p>`;
        containerElement.appendChild(currencyElement);
    }
}
