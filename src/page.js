
const displayElement = document.getElementById("display-element");
chrome.storage.local.get(['convertedValue'], function (result) {
    displayElement.innerText = result.convertedValue;
})