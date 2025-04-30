const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mdp'; 
const cardsPath = path.join(__dirname, 'data', 'card.json');
const { getAllUsers, saveAllUsers } = require('./Moduleuser');

function OpenBooster(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: "Token manquant" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = getAllUsers();

        // filtre pour afficher le bon utilisateur
        const userIndex = users.findIndex(u => u.id === decoded.id);
        if (userIndex === -1) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = users[userIndex];
        const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));

 
        const booster = cards
            .sort(() => 0.5 - Math.random()) // mélange
            .slice(0, 5);                    // prendre les 5 premières

  
        const selectedCard = booster[Math.floor(Math.random() * booster.length)];
        user.collection.push(selectedCard);
        users[userIndex] = user;

        saveAllUsers(users);

        const { password, ...safeUser } = user;

        res.status(200).json({
            message: "Booster ouvert avec succès",
            carteGagnee: selectedCard,
            utilisateur: safeUser
        });

    } catch (err) {
        console.error("JWT error:", err.message);
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
}

module.exports = {
    OpenBooster
};
