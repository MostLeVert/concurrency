function setDefaultCurrency(defaultCurrency) {
  chrome.storage.local.set({ defaultCurrency: defaultCurrency }, function () {
    if (chrome.runtime.lastError) {
      statusOutputElement.innerText = `Error setting default currency: ${chrome.runtime.lastError}`;
    } else {
      statusOutputElement.innerText = `Default currency set to ${defaultCurrency}`;
      currentSettingElement.innerText = defaultCurrency;
    }
  });
}
