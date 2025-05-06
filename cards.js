const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mdp';
const DELAI_BOOSTER = 30000; // 30 secondes
const NOMBRE_CARDS = 5; // Nombre de cartes par booster
const cardsPath = path.join(__dirname, 'data', 'card.json');
const { getAllUsers, saveAllUsers, groupCollectionByCard } = require('./Moduleuser');

// Fonction de tirage selon rareté
function RandomRarity(cards) {
    const commons = cards.filter(c => c.rarity === "common");
    const rares = cards.filter(c => c.rarity === "rare");
    const legendaries = cards.filter(c => c.rarity === "legendary");

    const rand = Math.floor(Math.random() * 100); //tire un chiffre aleatoire

    let pool;

    if (rand < 80) {
        pool = commons;
        // console.log(`🎲 Tirage random pour rareté : ${rand} : communs`);
    } else if (rand < 99, 9) {
        pool = rares;
        // console.log(`🎲 Tirage random pour rareté : ${rand} : rares`);
    } else {
        pool = legendaries;
        console.log(`🎲 Tirage random pour rareté : ${rand} : lengendaires`);
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

function OpenBooster(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: "Token manquant" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = getAllUsers();

        const userIndex = users.findIndex(u => u.id === decoded.id);
        if (userIndex === -1) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = users[userIndex];
        const now = Date.now();

        if (user.lastBooster && now - user.lastBooster < DELAI_BOOSTER) {
            const secondesRestantes = Math.ceil((DELAI_BOOSTER - (now - user.lastBooster)) / 1000);
            console.log(`⏳ Temps restant avant le prochain booster : ${secondesRestantes} secondes`);
            return res.status(429).json({
                message: `Veuillez patienter ${secondesRestantes} secondes avant d’ouvrir un nouveau booster.`

            });

        }

        user.lastBooster = now;

        const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
        const cartesGagnees = []; // Tableau pour stocker les cartes gagnées
        // Tirage d'une carte ou plusieur carte par booster aléatoire
        for (let i = 0; i < NOMBRE_CARDS; i++) {
            const selectedCard = RandomRarity(cards);
            // console.log(`Tirage de la carte ${i + 1} : ${selectedCard.name} (${selectedCard.rarity})`);
            if (!Array.isArray(user.collection)) { // Vérifier si la collection est un tableau
                user.collection = [];
            }
            user.collection.push(selectedCard);
            cartesGagnees.push(selectedCard);
        }

        users[userIndex] = user; // Mettre à jour l'utilisateur dans le tableau
        saveAllUsers(users); // Sauvegarder les utilisateurs mis à jour

        const { password, ...safeUser } = user; // Enlever le mot de passe de la réponse
        delete safeUser.lastBooster; // Enlever lastBooster de la réponse

        // Regrouper la collection :
        const groupedCollection = groupCollectionByCard(user.collection);


        res.status(200).json({
            message: "Booster ouvert avec succès",
            cartesGagnee: cartesGagnees,
            utilisateur: {
                ...safeUser,
                collection: groupedCollection  //collection déjà groupée
            }
        });

    } catch (err) {
        console.error("JWT error:", err.message);
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
}



module.exports = {
    OpenBooster,

};
