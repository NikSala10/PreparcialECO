RECURSOS
npm run start 
npm install --save-dev nodemon

FETCH CORTO:
function sendMove() {
  const name = document.getElementById("name").value;
  const move = document.getElementById("move").value;
  fetch("/play", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, move }),
  })
    .then((res) => res.json())
    .then(() => alert("Move sent"));
}

RENDER AND LOAGING 
function renderLoadingState() {
  const resultsP = document.getElementById("results");
  resultsP.innerHTML= ""
  resultsP.innerHTML = "Loading...";
}
function renderErrorState() {
  const resultsP = document.getElementById("results");
  resultsP.innerHTML= ""
  resultsP.innerHTML = "Failed to load data";
}
