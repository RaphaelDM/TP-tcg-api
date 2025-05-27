console.log("Hello world, Node Js");

const express = require("express");
const app = express();
const port = 3000;

const users = require("./Moduleuser");
const player = require("./cards");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send("Bienvenue sur l'API TCG avec Prisma 🚀")
);

// Inscription
app.post("/inscrit", users.RegisterUser);

// Connexion / Déconnexion
app.post("/login", users.LoginUser);
app.post("/deco", users.Disconnect);

// Infos utilisateur
app.get("/user", users.GetUser);
app.get("/users", users.GetAllUsers);

// Booster
app.post("/booster", player.OpenBooster);

// Cartes (nouveau via Prisma)
app.get("/cards", player.GetAllCards);

app.listen(port, () =>
  console.log(`✅ Serveur démarré sur http://localhost:${port}`)
);
