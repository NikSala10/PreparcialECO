const socket = io("http://localhost:5054", { path: "/rea-time" });

const divEsperaScreen = document.getElementById("screen-espera");
const divPolo = document.getElementById("polo").style.display = "none";
const divPoloEspecial = document.getElementById("polo-especial").style.display = "none";
const divMarco = document.getElementById("marco").style.display = "none";
const registerDiv = document.getElementById("register");
const inputNickName = document.getElementById("nickname");

let idPlayer ;
let rolPlayer;
let namePlayer;

document.getElementById("register-btn").addEventListener("click", sendPlayer);

const registerPlayerUrl = "http://localhost:5054/join-game";

async function sendPlayer() {
  try {
    if (!inputNickName.value) {
      alert("El nombre de usuario es requerido");
      return;
    }
    const registerRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: inputNickName.value}),
    };

    const response = await fetch(registerPlayerUrl, registerRequest);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }
    
    const data = await response.json();
    alert(data.message);

    idPlayer = data.player.id;
    namePlayer = data.player.name;
    rolPlayer = data.player.rol;
    const numberPlayers = data.numberPlayers;
    console.log(numberPlayers);
    
    inputNickName.value = "";

    document.getElementById("register").style.display = "none";

    document.getElementById("screen-espera").style.display = "block";
    divEsperaScreen.innerHTML = `
      <p>Hola ${namePlayer}, tu rol es ${rolPlayer}</p>
      <p>Esperando jugadores!!</p>
    `;

    function sendStartGame () {
      fetch ("http://localhost:5054/start-game/" ,{
        method: "POST",
        headers: {  "Content-Type": "application/json"},
        body: JSON.stringify({
        })
      })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));}

      if(numberPlayers === 3) {
        sendStartGame();
      }

      socket.on("startGame", () => {
        console.log("El juego ha comenzado");
        if (rolPlayer === "polo") {
          document.getElementById("polo").style.display = "block";
          document.getElementById("polo").innerHTML = `
            <h2>${namePlayer}</h2>
            <p>Tu rol es:</p>
            <p>${rolPlayer}</p>
            <p id="text"></p>
            <button id="gtr-polo">Gritar Polo</button>
          `

        document.getElementById("gtr-polo").style.display = "none";
        document.getElementById("text").style.display = "none";
        document.getElementById("gtr-polo").addEventListener("click", sendGritarPolo);


        } else if (rolPlayer === "marco") {
          document.getElementById("marco").style.display = "block";
          document.getElementById("marco").innerHTML = `
            <h2>${namePlayer}</h2>
            <p>Tu rol es:</p>
            <p>${rolPlayer}</p>
            <button id="gtr-marco">Gritar Marco</button>
            <div id="escoger-polo">
              <p>Haz click sobre el polo que quieres escoger:</p>
            </div>
          `
          document.getElementById("gtr-marco").addEventListener("click", sendGritarMarco);
          document.getElementById("escoger-polo").style.display = "none";

        } else if (rolPlayer === "polo-especial") {
          document.getElementById("polo-especial").style.display = "block";
          document.getElementById("polo-especial").innerHTML = `
            <h2>${namePlayer}</h2>
            <p>Tu rol es:</p>
            <p>${rolPlayer}</p>
            <p id="text"></p>
            <button id="gtr-polo">Gritar Polo</button>
          `
        document.getElementById("gtr-polo").style.display = "none";
        document.getElementById("text").style.display = "none";
        document.getElementById("gtr-polo").addEventListener("click", sendGritarPolo);
        }
        document.getElementById("screen-espera").style.display = "none";
    });

  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

const sendGritarMarco = () => {
  if (!idPlayer) {
    console.error("Error: idPlayer no está definido.");
    return;
  }

  fetch ("http://localhost:5054/notify-marco/" ,{
    method: "POST",
    headers: {  "Content-Type": "application/json"},
    body: JSON.stringify({userId: idPlayer})
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "Grito publicado") {
      let btnMarco = document.getElementById("gtr-marco");
      if (btnMarco) {
        btnMarco.style.display = "none";
      }
    }
  })
  .catch((error) => console.error("Error:", error));
}

const sendGritarPolo = () => {
  if (!idPlayer) {
    console.error("Error: idPlayer no está definido.");
    return;
  }

  fetch ("http://localhost:5054/notify-polo/" ,{
    method: "POST",
    headers: {  "Content-Type": "application/json"},
    body: JSON.stringify({userId: idPlayer, playerRol: rolPlayer})
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "Grito publicado") {
      let btnPolo = document.getElementById("gtr-polo");
      if (btnPolo) {
        btnPolo.style.display = "none";
      }
    }
  })
  .catch((error) => console.error("Error:", error));
}

socket.on("notification", (data) => { 
  console.log("Notificación recibida:", data); // Ver qué datos llegan

  let textElement = document.getElementById("text");
  let gtrPoloButton = document.getElementById("gtr-polo");
  let selectedPoloContainer = document.getElementById("escoger-polo");
  let gameOverContainer = document.getElementById("game-over");
  if (gameOverContainer) {
    gameOverContainer.style.display = "none";
  }

  if (textElement) {
    textElement.style.display = "block";
    textElement.innerHTML = `Marco ha gritado: Marco!!`;
  } 
  if (gtrPoloButton) {
    gtrPoloButton.style.display = "block";
  } 

  if (rolPlayer === "marco" && data.userId) {
    selectedPoloContainer.style.display = "block";
    
    const btn = document.createElement("button");
    btn.id = `${data.userId}`
    btn.className = "polo-selected";
    btn.innerText = `Un jugador ha gritado: Polo!`;
    btn.style.display = "block";
    selectedPoloContainer.appendChild(btn);
  }

  if (data.message.includes("Game over")) {
    console.log("🎮 FIN DEL JUEGO:", data.message);
    if (gameOverContainer) {
      gameOverContainer.style.display = "block";
      gameOverContainer.innerHTML = `
        <h2>GAME OVER</h2>
        <h4>${data.message}</h4>
      `
    }
  }
});

function handlePoloSelection(event) {
  if (event.target.tagName === "BUTTON") {
    const poloId = event.target.id; 
    console.log("ID del polo seleccionado:", poloId);

    fetch("http://localhost:5054/select-polo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: idPlayer, poloSelected: poloId, userName: namePlayer })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("📢 Respuesta del servidor:", data);
      if (data.message === "Game over") {
        document.getElementById("escoger-polo").style.display = "none";
      }
    })
    .catch((error) => console.error("Error:", error));
  }
}

// Agregar event listener al contenedor de botones si existe
let escogerPlBtns = document.getElementById("escoger-polo");
if (escogerPlBtns) {
  escogerPlBtns.addEventListener("click", handlePoloSelection);
}



  