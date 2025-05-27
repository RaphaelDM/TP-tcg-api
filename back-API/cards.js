// =============================
// Importation des modules
// =============================
const jwt = require('jsonwebtoken');               // Pour gérer les tokens d'authentification
const { PrismaClient } = require('@prisma/client'); // ORM Prisma pour interagir avec la base de données
const prisma = new PrismaClient();                 // Instance Prisma

// =============================
// Constantes de configuration
// =============================
const SECRET_KEY = 'mdp';               // Clé secrète pour les JWT (à sécuriser)
const DELAI_BOOSTER = 30000;            // Délai minimum (en ms) entre deux boosters : 30 secondes
const NOMBRE_CARDS = 5;                 // Nombre de cartes tirées par booster


// Valeur de conversion par rareté
const VALEUR_CONVERSION = {
    common: 10,
    rare: 20,
    legendary: 50,
};


// =============================
// Fonction utilitaire : RandomRarity
// =============================
// Tire une carte aléatoire selon la rareté :
// 80% commune, 17% rare, 3% légendaire
function RandomRarity(cards) {
    const commons = cards.filter(c => c.rarity === "common");
    const rares = cards.filter(c => c.rarity === "rare");
    const legendaries = cards.filter(c => c.rarity === "legendary");

    const rand = Math.floor(Math.random() * 100); // Génère un nombre entre 0 et 99
    let pool;

    if (rand < 80)
        pool = commons;
    else if (rand < 97)
        pool = rares;
    else
        pool = legendaries;

    return pool[Math.floor(Math.random() * pool.length)]; // Retourne une carte aléatoire du bon pool
}

// =============================
// Route GET /cartes
// =============================
// Récupère la liste de toutes les cartes disponibles
async function GetAllCards(req, res) {
    try {
        const cards = await prisma.card.findMany(); // Lecture des cartes depuis la base
        res.status(200).json({
            message: "Liste des cartes disponibles",
            cartes: cards
        });
    } catch (err) {
        console.error("❌ Erreur GetAllCards:", err.message);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// =============================
// Route POST /booster
// =============================
// Permet à un utilisateur connecté d'ouvrir un booster de cartes
async function OpenBooster(req, res) {
    const authHeader = req.headers.authorization;

    // Vérifie que le token est fourni
    if (!authHeader) return res.status(400).json({ message: "Token manquant" });

    const token = authHeader.split(" ")[1];

    try {
        // Vérifie et décode le token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Récupère l'utilisateur lié au token
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const now = Date.now();

        // Vérifie si l'utilisateur doit attendre avant de rouvrir un booster
        if (user.lastBooster && now - Number(user.lastBooster) < DELAI_BOOSTER) {
            const secondesRestantes = Math.ceil((DELAI_BOOSTER - (now - Number(user.lastBooster))) / 1000);
            return res.status(429).json({
                message: `Veuillez patienter ${secondesRestantes} secondes avant d’ouvrir un nouveau booster.`
            });
        }

        // Récupère toutes les cartes disponibles
        const cards = await prisma.card.findMany();
        const cartesGagnees = []; // Liste des cartes tirées

        // Initialise ou récupère la collection existante de l'utilisateur
        let collection = Array.isArray(user.collection) ? user.collection : [];

        // Tirage aléatoire de NOMBRE_CARDS cartes
        for (let i = 0; i < NOMBRE_CARDS; i++) {
            const selectedCard = RandomRarity(cards);

            // Incrémente le compteur de la carte si elle est déjà possédée
            const index = collection.findIndex(c => c.id === selectedCard.id);
            if (index !== -1) {
                collection[index].count = (collection[index].count || 1) + 1;
            } else {
                // Sinon, ajoute la carte à la collection
                collection.push({ ...selectedCard, count: 1 });
            }

            cartesGagnees.push(selectedCard);
        }

        // Met à jour la collection et le timestamp du dernier booster
        await prisma.user.update({
            where: { id: user.id },
            data: {
                collection,
                lastBooster: now
            }
        });

        // Préparation de l'utilisateur sans le mot de passe et avec conversion BigInt → Number
        const { password, ...safeUser } = user;
        const safeUserFormatted = {
            ...safeUser,
            lastBooster: user.lastBooster ? Number(user.lastBooster) : null,
            collection,
        };

        // Envoie les résultats au client
        res.status(200).json({
            message: "Booster ouvert avec succès",
            cartesGagnee: cartesGagnees,
            utilisateur: safeUserFormatted
        });

    } catch (err) {
        console.error("JWT error:", err.message);
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
}

// =============================
// Route POST /convert
// =============================
async function ConvertCard(req, res) {
    const authHeader = req.headers.authorization;
    const { cardId, amount } = req.body;

    // Vérifie que les paramètres sont bien fournis et valides
    if (!authHeader || !cardId || !amount || amount < 1) {
        return res.status(400).json({ message: "Paramètres manquants ou invalides" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Vérifie et décode le token JWT
        const decoded = jwt.verify(token, SECRET_KEY);

        // Récupère l'utilisateur à partir de l'ID contenu dans le token
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Récupère la collection de l'utilisateur
        let collection = Array.isArray(user.collection) ? user.collection : [];
        const index = collection.findIndex(c => c.id === cardId);

        // Vérifie si la carte est présente et en quantité suffisante
        if (index === -1 || collection[index].count <= amount) {
            return res.status(400).json({ message: "Pas assez de doublons pour cette conversion" });
        }

        // Récupère les infos de la carte (notamment la rareté)
        const card = await prisma.card.findUnique({ where: { id: cardId } });
        if (!card) return res.status(404).json({ message: "Carte introuvable" });

        // Met à jour la collection en retirant les doublons convertis
        collection[index].count -= amount;

        // Calcule les crédits gagnés selon la rareté de la carte
        const gain = VALEUR_CONVERSION[card.rarity] * amount;
        const newCurrency = (user.currency || 0) + gain;

        // Met à jour l'utilisateur dans la base de données
        await prisma.user.update({
            where: { id: user.id },
            data: {
                collection,
                currency: newCurrency
            }
        });

        // Répond au client avec les infos mises à jour
        res.status(200).json({
            message: `${amount} carte(s) convertie(s) (+${gain} crédits)`,
            currency: newCurrency,
            collection
        });

    } catch (err) {
        console.error("Convert error:", err.message);
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
}



// =============================
// Exportation des fonctions
// =============================
module.exports = {
    GetAllCards,
    OpenBooster,
    ConvertCard
};
