const cnFindrCtn = document.getElementById("cn-findr-ctn");
const cnSearchInp = document.getElementById("cn-search-inp");
const cnFindrRslts = document.getElementById("cn-findr-rslts");

const dfcurInterBtn = document.getElementById("dfcur-inter-btn");
const dfcurInterBtnCn = document.getElementById("dfcur-inter-btn-cn");
const dfcurInterBtnSt = document.getElementById("dfcur-inter-btn-st");

const cnvrtBtnA = document.getElementById("cnvrt-btn-a");
const cnvrtBtnStA = document.getElementById("cnvrt-btn-st-a");

const cnvrtBtnB = document.getElementById("cnvrt-btn-b");
const cnvrtBtnStB = document.getElementById("cnvrt-btn-st-b");

let activeButton = null;

cnFindrCtn.addEventListener("click", (e)  => {
	switch (cnFindrCtn.dataset.childOf) {
		case "dfcur-inter-btn":
			const curr = e.target.firstChild.innerText;
			chrome.storage.local.set({defaultCurrency: curr.toLowerCase()}, () => {
					dfcurInterBtnCn.innerText = curr;
				},
			);
			break;
	}
	searchEToggle(dfcurInterBtn, dfcurInterBtnSt);
})

function renderList(data) {
	while (cnFindrRslts.firstChild) {
		cnFindrRslts.removeChild(cnFindrRslts.firstChild)
	}
	let i = 0;
	for (let key in data) {
		if (i > 10) break;
		const listElem = document.createElement("div");
		listElem.classList.add("search-rslt");

		const listElemCode = document.createElement("span");
		listElemCode.classList.add("search-rslt-code")
		listElemCode.innerText = key.toUpperCase();

		const listElemDesc = document.createElement("span");
		listElemDesc.classList.add("search-rslt-desc");
		listElemDesc.innerText = data[key] || "-";

		listElem.appendChild(listElemCode);
		listElem.appendChild(listElemDesc);

		cnFindrRslts.appendChild(listElem);
		i++; 
	}
}

function search(searchTerm, data) {
	let searchResults = {};
	Object.keys(data).forEach(key => {
		if (key.includes(searchTerm) || data[key].toLowerCase().includes(searchTerm)) {
			searchResults[key] = data[key];
		}
	})
	renderList(searchResults);
}

fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
	.then((response) => response.json())
	.then((data) => {
		chrome.storage.local.set({ currenciesJson: data})
			.then(() => {
				console.log("Loaded latest currency data");
			})
		renderList(data);
		cnSearchInp.addEventListener("input", (e) => {
			search((e.target.value).toLowerCase(), data)
		});
	}).catch((e) => {
		console.error(e);
	});

function searchEToggle(clickedButton, stChild) {
	if (cnFindrCtn.style.display === "block" && activeButton === clickedButton) {
		cnFindrCtn.style.display = "none";
		document.body.style.height = "309.43px"; 
		eStToggle(stChild, false); 
		activeButton = null; 
	} else if (cnFindrCtn.style.display !== "block") {
		cnFindrCtn.dataset.childOf = clickedButton.id;
		cnFindrCtn.style.display = "block";
		const coords = clickedButton.getBoundingClientRect();
		const lowerLeftY = coords.bottom;
		const lowerLeftX = coords.right;
		document.body.style.height = `${document.body.offsetHeight + (225 + lowerLeftY - 309.43) - 12}px`;
		cnFindrCtn.style.top = `${lowerLeftY + 5}px`;
		cnFindrCtn.style.left = `${lowerLeftX- 128}px`;
		activeButton = clickedButton; 
		eStToggle(stChild, true); 
	}
}


function eStToggle(stCtn, isActive) {
	stCtn.innerText = isActive ? "▲" : "▼";
}

dfcurInterBtn.addEventListener("click", (e) => {
	searchEToggle(dfcurInterBtn, dfcurInterBtnSt);
})

cnvrtBtnA.addEventListener("click", (e) => {
	searchEToggle(cnvrtBtnA, cnvrtBtnStA);
})

cnvrtBtnB.addEventListener("click", (e) => {
	searchEToggle(cnvrtBtnB, cnvrtBtnStB);
})
