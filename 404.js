function redirectWithQuery() {
  const basePath = "https://aswanting.github.io/portfolio/?from=";
  const pathQuery = window.location.pathname.split("/").at(-1);
  window.location.href = basePath + pathQuery;
}

console.log("SCRIPT");
redirectWithQuery();
