const convertInp_a = document.getElementById("convertInp-a");
const convertBtn_a = document.getElementById("convertBtn-a")
const convertBtnCn_a = document.getElementById("convertBtn-a-cn")
const convertBtnSt_a = document.getElementById("convertBtn-a-st")
const convertSearchCtn_a = document.getElementById("convertSearchCtn-a")
const convertSearchInp_a = document.getElementById("convertSearchInp-a");
const convertSearchRslt_a = document.getElementById("convertSearchRslt-a");

document.addEventListener("DOMContentLoaded", () => {
	loadData();
})

function loadData() {
	fetch(
		"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json",
	)
	.then((response) => response.json())
	.then((data) => {
		for (let key in data) {
			const searchResultElement = document.createElement("div");
			searchResultElement.classList.add("search-result")
			searchResultElement.innerText = key;
			convertSearchRslt_a.append(searchResultElement);
		}
	})
	.catch((e) => {
		console.error(e);
	});
}

function toggleElement(e) {
	e.style.display = e.style.display === "block" ? "none" : "block";
}

function toggleExpansionIcon(e) {
	e.innerText = e.innerText === "▼" ? e.innerText = "▲" : e.innerText = "▼";
}

convertBtn_a.addEventListener("click", () => {
	toggleElement(convertSearchCtn_a);
	toggleExpansionIcon(convertBtnSt_a);
})
