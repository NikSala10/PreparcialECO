RECURSOS
npm run start     
    npm install --save-dev nodemon
    Set-ExecutionPolicy -Scope CurrentUser unrestricted

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
