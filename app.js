console.log("Hello world, Node Js");
const users = require('./Moduleuser');
const player = require('./cards');

const express = require("express"); 
const app = express();
const port = 3000;
// Important : permet de lire les JSON envoyés via fetch(...)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send("Bienvenue sur l'API TCG")
);

//Post pour ajouter un utilisateur
app.post("/inscrit", users.RegisterUser);

//Get pour récupérer tous les utilisateurs
app.get('/users', users.GetAllUsers);

//Get pour récupérer tous les utilisateurs en fonction du token
app.get('/user', users.GetUser);

//Post lorsqu'un utilisateur se connecte
app.post('/login', users.LoginUser);

//Post pour déconnecter un utilisateur
app.post('/deco', users.Disconnect);

app.post("/booster", player.OpenBooster);

app.listen(port, () =>
  console.log(`Serveur démarer sur http://localhost:3000 !`)
);

