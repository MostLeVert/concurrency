function injectDiv(from, to, amountIn, amountOut, x, y) {
  // This is a hack to prevent duplicate TODO: FIND ROOT OF DUPLICATE
  if (document.getElementById("conversionChildElement")) {
    return;
  } else {
    var d = document.createElement("div");
    d.setAttribute(
      "style",
      "background: rgba(255,255,255,.25);" +
        "position: fixed; " +
        "padding: 10px;" +
        "backdrop-filter: blur(10px);" +
        "border: 2px solid black;" +
        `top: ${y}px;` +
        `left: ${x}px;` +
        "z-index: 9999; ",
    );
    d.innerText = `${amountIn} ${from} is ${amountOut} ${to}`;
    d.id = "conversionChildElement";
    document.body.appendChild(d);
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "injectDiv") {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left + window.scrollX; // Adding scrollX for horizontal scroll offset
    const y = rect.bottom + window.scrollY;
    injectDiv(
      request.from,
      request.to,
      request.amountIn,
      request.amountOut,
      x,
      y,
    );
    sendResponse({ result: "success" });
  }
});

document.addEventListener("click", handleClickOutside);

function handleClickOutside(event) {
  const e = document.getElementById("conversionChildElement");
  if (e && !e.contains(event.target)) {
    e?.remove();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("conversionChildElement")?.remove();
  }
});
document.addEventListener("scroll", () => {
  document.getElementById("conversionChildElement")?.remove();
});
