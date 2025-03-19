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
            <button class="gtr-polo">Gritar Polo</button>
          `

        document.querySelector(".gtr-polo").style.display = "none";
        document.getElementById("text").style.display = "none";
        document.querySelector(".gtr-polo").addEventListener("click", sendGritarPolo);


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
            <button class="gtr-polo-especial">Gritar Polo</button>
          `
        document.querySelector(".gtr-polo-especial").style.display = "none";
        document.getElementById("text").style.display = "none";
        document.querySelector(".gtr-polo-especial").addEventListener("click", sendGritarPoloEspecial);
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
socket.on("notification", (data) => { 
  
  let textElement = document.getElementById("text");
  let gtrPoloButton = document.querySelector(".gtr-polo");
  let gtrPoloEspecialButton = document.querySelector(".gtr-polo-especial");
  let selectedPoloContainer = document.getElementById("escoger-polo");
  let gameOverContainer = document.getElementById("game-over");
  if (gameOverContainer) {
    gameOverContainer.style.display = "none";
  }

  if (textElement) {
    textElement.style.display = "block";
    textElement.innerHTML = `Marco ha gritado: Marco!!`;
  } 
  if (gtrPoloButton && !yaGritoPolo) {
    gtrPoloButton.style.display = "block";
  } 
  if (gtrPoloEspecialButton && !yaGritoPoloEspecial) {
    gtrPoloEspecialButton.style.display = "block";
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
    const marcoDiv = document.getElementById("marco");
    if (marcoDiv) {
      marcoDiv.style.display = "none";
    }

    const poloDiv = document.getElementById("polo");
    if (poloDiv) {
      poloDiv.style.display = "none";
    }

    const poloEspecialDiv = document.getElementById("polo-especial");
    if (poloEspecialDiv) {
      poloEspecialDiv.style.display = "none";
    }

    if (gameOverContainer) {
      gameOverContainer.style.display = "block";
      gameOverContainer.innerHTML = `
        <h2>GAME OVER</h2>
        <h4>${data.message}</h4>
      `
    }
  }
});

let yaGritoPolo = false;
const sendGritarPolo = () => {

  if (!idPlayer) {
    console.error("Error: idPlayer no está definido.");
    return;
  }

  fetch ("http://localhost:5054/notify-polo/" ,{
    method: "POST",
    headers: {  "Content-Type": "application/json"},
    body: JSON.stringify({userId: idPlayer})
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "Grito publicado") {
      document.querySelector(".gtr-polo").style.display = "none"; 
      yaGritoPolo = true; 
    }
  })
  .catch((error) => console.error("Error:", error));
}

let yaGritoPoloEspecial = false;
const sendGritarPoloEspecial = () => {

  if (!idPlayer) {
    console.error("Error: idPlayer no está definido.");
    return;
  }
 
  fetch ("http://localhost:5054/notify-polo/" ,{
    method: "POST",
    headers: {  "Content-Type": "application/json"},
    body: JSON.stringify({userId: idPlayer})
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "Grito publicado") {
      document.querySelector(".gtr-polo-especial").style.display = "none"; 
      yaGritoPoloEspecial = true; 
    }
  })
  .catch((error) => console.error("Error:", error));
}

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("polo-selected")) {
    handlePoloSelection(event);
  }
});


function handlePoloSelection(event) {
  if (event.target.tagName === "BUTTON") {
    const poloId = event.target.id; 

    fetch("http://localhost:5054/select-polo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: idPlayer, poloSelected: poloId, userName: namePlayer })
    })
    .then(response => response.json())
    .then((data) => {
  
      if (data && data.message && data.message.includes("Game over")) {
        
        let escogerPoloDiv = document.getElementById("escoger-polo");
        if (escogerPoloDiv) {
          escogerPoloDiv.style.display = "none";
        } else {
          console.error("❌ No se encontró el div 'escoger-polo'");
        }
        
        let poloButtons = document.querySelectorAll(".polo-selected");
        if (poloButtons.length > 0) {
          poloButtons.forEach((btn) => {
            btn.style.display = "none";
          });
        } else {
          console.error("❌ No se encontraron botones con clase 'polo-selected'");
        }
        setTimeout(resetGame, 8000);
      }
    })
    .catch((error) => console.error("Error:", error));
  }
}

function resetGame() {
  fetch("http://localhost:5054/reset-game", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === "Juego reiniciado") {
      document.getElementById("game-over").style.display = "none";

      idPlayer = null;
      rolPlayer = null;
      namePlayer = null;

      document.getElementById("register").style.display = "block";
    }
  })
  .catch(error => console.error("Error:", error));
}

socket.on("resetGame", () => {
 
  // Mostrar nuevamente todos los jugadores
  document.getElementById("marco").style.display = "none";
  document.getElementById("polo").style.display = "none";
  document.getElementById("polo-especial").style.display = "none";

  // Volver a mostrar la pantalla de registro
  document.getElementById("register").style.display = "block";

  // Ocultar mensaje de Game Over si existe
  let gameOverDiv = document.getElementById("game-over");
  if (gameOverDiv) {
    gameOverDiv.style.display = "none";
  }

  // Resetear variables del jugador
  idPlayer = null;
  rolPlayer = null;
  namePlayer = null;
});