// Importation des modules nécessaires
const { PrismaClient } = require('@prisma/client'); // ORM pour interagir avec la base de données
const jwt = require('jsonwebtoken');                // Pour la génération et vérification des tokens JWT
const prisma = new PrismaClient();                  // Instance Prisma pour effectuer les requêtes

const SECRET_KEY = 'mdp'; // Clé secrète utilisée pour signer les tokens JWT (à sécuriser en prod)

// ===========================
// Fonction : RegisterUser
// ===========================
// Inscription d'un nouvel utilisateur
async function RegisterUser(req, res) {
  const { username, password } = req.body;

  // Vérifie que le nom d'utilisateur et le mot de passe sont fournis
  if (!username || !password) {
    return res.status(400).json({ message: 'Username ou password manquant' });
  }

  // Vérifie si l'utilisateur existe déjà
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return res.status(409).json({ message: 'Utilisateur existe déjà' });
  }

  // Crée un nouvel utilisateur avec une collection vide, aucun booster ouvert et aucun token
  const user = await prisma.user.create({
    data: {
      username,
      password,
      collection: [],
      lastBooster: null,
      token: null,
    },
  });

  // Retourne l'utilisateur créé (mot de passe inclus ici → à filtrer en prod)
  res.status(201).json({
    message: 'Utilisateur ajouté avec succès',
    utilisateur: user,
  });
}

// ===========================
// Fonction : LoginUser
// ===========================
// Connexion d'un utilisateur existant
async function LoginUser(req, res) {
  const { username, password } = req.body;

  // Vérifie que les identifiants sont fournis
  if (!username || !password) {
    return res.status(400).json({ message: 'Username ou password manquant' });
  }

  // Recherche de l'utilisateur avec les bons identifiants
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  // Si aucun utilisateur trouvé, retourne une erreur
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  // Génère un token JWT valide 15 minutes
  const token = jwt.sign({ id: user.id, username }, SECRET_KEY, {
    expiresIn: '15min',
  });

  // Met à jour le token de l'utilisateur en base
  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  });

  // Retourne le token généré
  res.status(200).json({
    message: 'Authentification réussie',
    data: { token },
  });
}

// ===========================
// Fonction : Disconnect
// ===========================
// Déconnexion d’un utilisateur (invalide son token)
async function Disconnect(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token manquant' });
  }

  // Décode le token (sans vérification de validité)
  const decoded = jwt.decode(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token invalide' });
  }

  // Supprime le token dans la base de l'utilisateur
  await prisma.user.update({
    where: { id: decoded.id },
    data: { token: null },
  });

  res.status(200).json({ message: 'Déconnexion réussie' });
}

// ===========================
// Fonction : GetAllUsers
// ===========================
async function GetAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();

    // ✅ Convertit les BigInt en Number (notamment lastBooster) et inclut les mots de passe
    const safeUsers = users.map(user => ({
      ...user,
      lastBooster: user.lastBooster ? Number(user.lastBooster) : null,
    }));

    res.status(200).json({
      message: 'Liste des utilisateurs',
      utilisateurs: safeUsers // mots de passe inclus, BigInt convertis
    });

    // 🔐 Variante sécurisée (commentée) — sans mot de passe :
    // const filteredUsers = users.map(user => {
    //   const { password, ...rest } = user;
    //   return {
    //     ...rest,
    //     lastBooster: user.lastBooster ? Number(user.lastBooster) : null,
    //   };
    // });
    // res.status(200).json({
    //   message: 'Liste des utilisateurs',
    //   utilisateurs: filteredUsers,
    // });

  } catch (error) {
    console.error("❌ Erreur dans GetAllUsers:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// ===========================
// Fonction : GetUser
// ===========================
// Récupère les informations de l'utilisateur à partir du token fourni
async function GetUser(req, res) {
  const authHeader = req.headers.authorization;

  // Vérifie que le token est présent dans l'en-tête
  if (!authHeader) {
    return res.status(400).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Récupère l'utilisateur par son ID
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Filtre le mot de passe et convertit lastBooster
    const { password, ...rest } = user;
    const safeUser = {
      ...rest,
      lastBooster: user.lastBooster ? Number(user.lastBooster) : null,
    };

    res.status(200).json({
      message: 'Utilisateur trouvé',
      utilisateur: safeUser,
    });
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}

// Export des fonctions pour les utiliser dans les routes
module.exports = {
  RegisterUser,
  LoginUser,
  Disconnect,
  GetAllUsers,
  GetUser,
};
