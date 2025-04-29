console.log("Hello world, Node Js");
const path = require("path");
const users = require('./Moduleuser');

const express = require("express"); 
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send("Bienvenue sur l'API TCG")
);

//Post pour ajouter un utilisateur
app.post("/inscrit", users.RegisterUser);

//Get pour récupérer tous les utilisateurs
app.get('/users', users.GetAllUsers);

//Post lorsqu'un utilisateur se connecte
app.post('/login', users.LoginUser);

//Post pour déconnecter un utilisateur
app.post('/deco', users.Disconnect);

app.listen(port, () =>
  console.log(`Serveur démarer sur http://localhost:3000 !`)
);

