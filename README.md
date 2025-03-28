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
