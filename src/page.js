fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
	.then((response) => response.json())
	.then((data) => {
		chrome.local.storage.set({ currenciesJson: data})
			.then(() => {
				console.log("Loaded latest currency data");
			})
	}).catch((e) => {
		console.error(e);
	});


