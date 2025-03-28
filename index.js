const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/rea-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));

let roles = [
  "polo",
  "marco", 
  "polo-especial"
];
let players = [];

app.get("/join-game", (req, res) => {
  res.send(players);
});

app.post("/join-game", (request, response) => {
  const {name} = request.body;

  if (roles.length === 0) {
    return response.status(400).send({ message: "No quedan roles disponibles" });
  }

  const rolAleatorio = Math.floor(Math.random() * roles.length);
  const rolSeleccionado = roles[rolAleatorio];

  // Remueve el rol asignado del array
  roles.splice(rolAleatorio, 1);


  const newPlayer = { id: players.length + 1, name, rol:rolSeleccionado};
  players.push(newPlayer);

  response.status(201).send({ message: "Jugador registrado correctamente", player: newPlayer, numberPlayers: players.length});
});

app.post("/start-game", (request, response) => {
  io.emit("startGame");
  response.status(201).send({ message: "Juego iniciado" });
});

app.get("/start-game", (req, res) => {
  res.send({message: "Juego iniciado"});
});

app.post("/notify-marco", (request, response) => {
  const {playerId} = request.body;
  io.emit("notification", { userId: playerId, message: "Marco!" });
  response.status(200).send({ message: "Grito publicado"});
});

app.get("/notify-marco", (req, res) => {
  res.send({message: "Grito publicado"});
});

app.post("/notify-polo", (request, response) => {
  const {userId} = request.body;
  if (!userId) {
    return response.status(400).send({ message: "Error: userId es requerido" });
  }
  io.emit("notification", { userId, message: "Polo!" });
  response.status(200).send({ message: "Grito publicado"});
});

app.post("/select-polo", (request, response) => {
  const {userId, poloSelected, userName} = request.body;
  const jugadorSeleccionado = players.find(player => player.id == poloSelected);

  if (!jugadorSeleccionado) {
    return response.status(400).json({ message: "Jugador no encontrado" });
  }

  const poloEspecial = players.find(player => player.rol.trim().toLowerCase() === "polo-especial");
  if (jugadorSeleccionado.rol.trim().toLowerCase() === "polo-especial") {
    io.emit("notification", { userId, message: `Game over: El Marco ${userName} ha ganado! 🎉 El Polo ${jugadorSeleccionado.name} ha sido capturado.`});
  } else {
    io.emit("notification", { userId, message: `Game over: El Marco ${userName} ha perdido. El Polo ${poloEspecial ? poloEspecial.name : "desconocido"}  ha escapado. ❌` });
  }
  response.status(200).json({ message: "Game over"});
});

app.post("/reset-game", (req, res) => {
  roles = ["polo", "marco", "polo-especial"];
  players = [];
  io.emit("resetGame");
  console.log("Juego reiniciado. Roles restaurados:", roles); 
  res.status(200).json({ message: "Juego reiniciado" });
});

httpServer.listen(5054);
