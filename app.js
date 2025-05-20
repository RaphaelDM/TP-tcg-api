console.log("Hello world, Node Js");
const Card = require('./Models/cardEntity');
const users = require('./Moduleuser');
const player = require('./cards');
// const bdd = require('./db');
// const User = require('./Models/user');
// const card = require('');



const express = require("express"); 
const app = express();
const port = 3000;

// async function main() {
//   try {
//     await bdd.authenticate();
//     console.log("✅ Connexion réussie à la BDD");

//     await bdd.sync({ alter: true }); // Crée les tables
//     console.log("✅ Tables synchronisées");
//   } catch (error) {
//     console.error("❌ Erreur de connexion :", error);
//   }
// }
// main();

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

//Get pour toute les cartes a collectionner 
app.get('/card', player.GetAllCards);

//Get pour récupérer tous les utilisateurs en fonction du token
app.get('/user', users.GetUser);

//Post lorsqu'un utilisateur se connecte
app.post('/login', users.LoginUser);

//Post pour déconnecter un utilisateur
app.post('/deco', users.Disconnect);
//Ouvrir un booster
app.post("/booster", player.OpenBooster);

// app.post("/convert", player.ConvertCard);

app.listen(port, () =>
  console.log(`Serveur démarer sur http://localhost:3000 !`)
);

