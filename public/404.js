function redirectWithQuery() {
  const basePath = "https://aswanting.github.io/portfolio/?";
  const pathQuery = window.location.pathname.split("/").at(-1);
  window.location.href = basePath + pathQuery;
}

redirectWithQuery();
