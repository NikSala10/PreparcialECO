RECURSOS
npm install socket.io
npm run start     
    npm install --save-dev nodemon
    Set-ExecutionPolicy -Scope CurrentUser unrestricted

    .find(...) es un método de los arrays en JavaScript que busca el primer elemento que cumpla una condición y lo devuelve. Si no encuentra nada, devuelve undefined.

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


METODOS HTTP
 PUT → Si quieres sobrescribir todo el objeto.      
     PATCH → Si solo quieres modificar una parte.
     GET	Obtener información	   
POST	Crear un recurso		    
DELETE	Eliminar un recurso     




DELTE
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);
    res.json({ message: "Usuario eliminado" });
});
📝 ¿Qué hace?

Filtra la lista para eliminar al usuario con el ID indicado.




PATCH
app.patch("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (req.body.name) {
        user.name = req.body.name;
    }

    res.json(user);
});
📝 ¿Qué hace?

Busca el usuario por ID.

Solo cambia el name si se envió en el req.body.



PUT
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    users[userIndex] = { id: userId, name: req.body.name };
    res.json(users[userIndex]);
});
📝 ¿Qué hace?

Busca un usuario por su ID (req.params.id).

Reemplaza toda su información con la nueva (req.body.name).


POST

app.post("/users", (req, res) => {
    const newUser = { id: Date.now(), name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});


📝 ¿Qué hace?

Recibe datos (req.body.name) y crea un nuevo usuario.

Lo guarda en la lista users.




CSS 
/* 🌟 Estilos Generales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #333;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 🔘 Botón Estilizado */
.btn {
  display: inline-block;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

/* 🔲 Input Estilizado */
.input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: 0.3s ease-in-out;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

/* 🃏 Cards en Grid (Responsivas) */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Se adapta a cualquier tamaño */
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

/* 🎯 Centrar Cards */
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

Para poner en filas las cards
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
    margin-top: 20px;

IMAGENES 
/* 📷 Imagen General */
.img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

/* 🔵 Imagen Redonda */
.img-round {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
}

/* 🎭 Imagen con Hover */
.img-hover:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* 🖼️ Galería de Imágenes con Grid */
.img-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
}

.img-gallery img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.img-gallery img:hover {
  transform: scale(1.08);
}

/* 🎯 Centrar Imágenes */
.center-img {
  display: flex;
  justify-content: center;
  align-items: center;
}





app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);

    io.emit("deletePost", postId); // Notifica a todos los clientes en tiempo real
    res.json({ message: "Post eliminado" });
});

 function deletePost(id) {
            fetch(`http://localhost:4000/posts/${id}`, { method: "DELETE" });
        }


 const socket = io("http://localhost:4000");

        function createPost() {
            const imgUrl = document.getElementById("imgUrl").value;
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;

            fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imgUrl, title, description })
            });
        }

        function deletePost(id) {
            fetch(`http://localhost:4000/posts/${id}`, { method: "DELETE" });
        }

        function renderPost(post) {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <img src="${post.imgUrl}" width="100"><br>
                <strong>${post.title}</strong><br>
                ${post.description}<br>
                <button onclick="deletePost(${post.id})">Delete</button>
            `;
            document.getElementById("postsList").appendChild(postElement);
        }

        function fetchPosts() {
            fetch("http://localhost:4000/posts")
                .then(res => res.json())
                .then(posts => {
                    document.getElementById("postsList").innerHTML = "";
                    posts.forEach(renderPost);
                });
        }

        socket.on("newPost", post => renderPost(post));

        socket.on("deletePost", postId => {
            fetchPosts();
        });

        fetchPosts(); 



let posts = [];

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    const { imgUrl, title, description } = req.body;
    const newPost = { id: posts.length + 1, imgUrl, title, description };
    posts.push(newPost);

    io.emit("newPost", newPost); // Notifica a todos los clientes en tiempo real
    res.status(201).json(newPost);
});

app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);

    io.emit("deletePost", postId); // Notifica a todos los clientes en tiempo real
    res.json({ message: "Post eliminado" });
});

        








Reglas del Juego
Hay tres tipos de roles:

Exploradores 👨‍🚀: Reciben problemas en la nave y deben reportarlos.

Ingeniero Jefe 🔧: Da instrucciones sobre cómo reparar los sistemas basándose en reportes.

Sistema de la Nave 🚀 (controlado por el servidor): Genera fallos aleatorios.

Turnos:

Los exploradores reportan problemas en tiempo real.

El ingeniero debe responder con soluciones en el menor tiempo posible.

Si un problema no se resuelve en 30 segundos, se agrava.

Si se acumulan 5 fallos graves, la nave se pierde en el agujero negro.

📌 Backend (Servidor con Express y Socket.IO)
📍 Gestiona los jugadores, turnos y fallos del sistema.

js
Copiar
Editar
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

let players = [];
const roles = ["Explorador", "Ingeniero Jefe"];
let availableRoles = [...roles];
let activeProblems = [];
let criticalFailures = 0;

const generateProblem = () => {
    const problems = ["Fallo en el motor", "Oxígeno bajo", "Sistema de navegación roto", "Baterías descargadas"];
    return problems[Math.floor(Math.random() * problems.length)];
};

io.on("connection", (socket) => {
    console.log("Nuevo jugador conectado:", socket.id);

    socket.on("joinGame", (name) => {
        if (availableRoles.length === 0) {
            socket.emit("error", "No hay más roles disponibles");
            return;
        }

        const role = availableRoles.shift(); // Asigna un rol
        const player = { id: socket.id, name, role };
        players.push(player);

        socket.emit("playerAssigned", player);
        io.emit("updatePlayers", players);

        if (role === "Ingeniero Jefe") {
            socket.emit("instructions", "Prepárate para solucionar problemas.");
        }
    });

    socket.on("reportProblem", () => {
        if (activeProblems.length >= 3) {
            socket.emit("error", "No se pueden reportar más problemas a la vez.");
            return;
        }

        const problem = generateProblem();
        activeProblems.push({ id: Date.now(), issue: problem, status: "Pendiente" });
        
        io.emit("newProblem", activeProblems);
        
        setTimeout(() => {
            let problemIndex = activeProblems.findIndex(p => p.issue === problem);
            if (problemIndex !== -1 && activeProblems[problemIndex].status === "Pendiente") {
                activeProblems[problemIndex].status = "Crítico";
                criticalFailures++;
                io.emit("updateProblems", activeProblems);
                
                if (criticalFailures >= 5) {
                    io.emit("gameOver", "La nave ha sido absorbida por el agujero negro.");
                    resetGame();
                }
            }
        }, 30000); // 30 segundos para resolver antes de que se agrave
    });

    socket.on("fixProblem", (problemId) => {
        let problemIndex = activeProblems.findIndex(p => p.id === problemId);
        if (problemIndex === -1) return;
        
        activeProblems.splice(problemIndex, 1);
        io.emit("updateProblems", activeProblems);
    });

    socket.on("disconnect", () => {
        players = players.filter(p => p.id !== socket.id);
        io.emit("updatePlayers", players);
    });
});

function resetGame() {
    players = [];
    availableRoles = ["Explorador", "Ingeniero Jefe"];
    activeProblems = [];
    criticalFailures = 0;
}

server.listen(5053, () => {
    console.log("Server running on http://localhost:5053");
});
📌 Frontend (HTML + JavaScript con Socket.IO)
📍 Interfaz para interactuar con el servidor y visualizar problemas en tiempo real.

html
Copiar
Editar
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rescate Espacial</title>
    <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
</head>
<body>
    <h1>🚀 Rescate Espacial</h1>
    <div id="game">
        <input type="text" id="name" placeholder="Tu nombre">
        <button onclick="joinGame()">Unirse</button>
        
        <h2 id="role"></h2>
        <button id="reportBtn" onclick="reportProblem()" disabled>Reportar Problema</button>
        
        <h3>Problemas Activos:</h3>
        <ul id="problemList"></ul>
    </div>

    <script>
        const socket = io("http://localhost:5053");

        function joinGame() {
            const name = document.getElementById("name").value;
            if (!name) return alert("Introduce tu nombre");
            socket.emit("joinGame", name);
        }

        socket.on("playerAssigned", (player) => {
            document.getElementById("role").innerText = `Eres: ${player.role}`;
            if (player.role === "Explorador") {
                document.getElementById("reportBtn").disabled = false;
            }
        });

        function reportProblem() {
            socket.emit("reportProblem");
        }

        socket.on("newProblem", (problems) => {
            const list = document.getElementById("problemList");
            list.innerHTML = "";
            problems.forEach((p) => {
                let li = document.createElement("li");
                li.innerText = `${p.issue} - ${p.status}`;
                list.appendChild(li);
            });
        });

        socket.on("gameOver", (message) => {
            alert(message);
        });
    </script>
</body>
</html>
📌 Desafíos E
 
