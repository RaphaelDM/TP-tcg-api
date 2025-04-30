const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mdp'; 
const usersFilePath = path.join(__dirname, 'data', 'user.json');

// Lire tous les utilisateurs depuis user.json
function getAllUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    // console.log("Data read from file:", data); // Debug
    return JSON.parse(data);
    
}

// Enregistrer les utilisateurs dans user.json
function saveAllUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}


//___________________________Partie register______________________________________________
function addUser(username, password, collection) {
    let users = getAllUsers();

    // Vérifier si le username existe déjà
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return { success: false, message: "Erreur : Utilisateur existe déjà" };
    }

    // Générer un nouvel id
    let newId = 1;
    if (users.length > 0) {
        newId = users[users.length - 1].id + 1;
    }

    const newUser = {
        id: newId,
        username: username,
        password: password,
        collection: collection || [], 
    };

    users.push(newUser);
    saveAllUsers(users);

    return { success: true, user: newUser };
}

function RegisterUser(req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ "message": "Erreur : Aucune donnée reçue" });
    }

    const { username, password, collection } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "message": "Erreur : Username ou password manquant" });
    }

    const result = addUser(username, password, collection);

    if (!result.success) {
        return res.status(409).json({ "message": result.message });
    }

    res.status(201).json({
        "message": "Utilisateur ajouté avec succès",
        "utilisateur": result.user
    });
}
//__________________________________________________________________________

//___________________________Partie login______________________________________________

function LoginUser(req, res) {
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Erreur : Username ou password manquant" });
    }

    const { username, password } = req.body;
    let users = getAllUsers();

    const userIndex = users.findIndex(user => user.username === username && user.password === password);

    if (userIndex === -1) {
        return res.status(401).json({ message: "Erreur : Identifiants invalides" });
    }

    const user = users[userIndex]; // <-- CORRECTION : on récupère l'utilisateur

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '15min' }
    );

    // Sauvegarder le token dans l'utilisateur
    users[userIndex].token = token;
    saveAllUsers(users);

    res.status(200).json({
        message: "Authentification réussie",
        data: {
            token: token
        }
    });
}

//__________________________________________________________________________

//___________________________Partie getAllUsers______________________________________________
function GetAllUsers(req, res) {
    const users = getAllUsers();

    res.status(200).json({
        "message": "Liste des utilisateurs",
        "utilisateurs": users
    });
}
//__________________________________________________________________________
//___________________________Partie getUser______________________________________________
// Récupérer les informations de l'utilisateur connecté
function GetUser(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: "Token manquant" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = getAllUsers();
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const { password, ...safeUser } = user;
        res.status(200).json({
            message: "Utilisateur trouvé",
            utilisateur: safeUser
        });

    } catch (err) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
}

//__________________________________________________________________________

//_____________________________Déconecter______________________________________________
function Disconnect(req, res) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Erreur : Token manquant" });
    }

    let users = getAllUsers();
    const userIndex = users.findIndex(user => user.token === token);

    if (userIndex === -1) {
        return res.status(401).json({ message: "Erreur : Token invalide" });
    }

    // Supprimer le token
    delete users[userIndex].token;
    saveAllUsers(users);

    res.status(200).json({ message: "Déconnexion réussie" });
}
//__________________________________________________________________________
module.exports = {
    getAllUsers,
    RegisterUser,
    GetAllUsers,
    LoginUser,
    Disconnect,
    GetUser
};
