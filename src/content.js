function createAndAppendDiv() {
  var d = document.createElement("div");
  d.setAttribute(
    "style",
    "background-color: red; " +
      "width: 100px; " +
      "height: 100px; " +
      "position: fixed; " +
      "top: 70px; " +
      "left: 30px; " +
      "z-index: 9999; ",
  );
  document.body.appendChild(d);
}
createAndAppendDiv();
