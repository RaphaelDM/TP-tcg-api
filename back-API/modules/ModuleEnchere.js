// =============================
// Module Enchère – Imports
// =============================
const jwt = require("jsonwebtoken");               // Pour décoder les tokens
const { PrismaClient } = require("@prisma/client");// ORM pour la base de données
const prisma = new PrismaClient();                 // Création de l'instance Prisma

// =============================
// Constantes de configuration
// =============================
const SECRET_KEY = "mdp";                          // Clé secrète JWT 
const DUREE_ENCHERE_MS = 60 * 60 * 1000; // Durée d'une enchère en millisecondes (1 heure)

// =============================
// Fonction pour créer une enchère
// =============================
// =============================
// Fonction pour créer une enchère
// =============================
async function CreateAuction(req, res) {
  const { cardId, startBid } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || !cardId || typeof startBid !== "number" || startBid < 1) {
    return res.status(400).json({
      message: "Token, carte ou prix de départ invalide",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Parsing collection
    let collection = [];
    try {
      collection = Array.isArray(user.collection)
        ? user.collection
        : JSON.parse(user.collection);
    } catch {
      return res.status(500).json({
        message: "Erreur de lecture de la collection utilisateur",
      });
    }

    // Vérification présence de la carte
    const index = collection.findIndex((c) => c.id === cardId);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Carte non présente dans la collection" });
    }

    if (collection[index].count < 2) {
      return res.status(400).json({
        message:
          "❌ Vous devez posséder au moins 2 exemplaires pour vendre un doublon",
      });
    }

    // Retirer 1 exemplaire
    collection[index].count -= 1;
    if (collection[index].count === 0) {
      collection.splice(index, 1);
    }
    const endDate = new Date(Date.now() + DUREE_ENCHERE_MS);
    // 💡 Créer une enchère avec une date "d'ouverture" qu'on appelle end_date
    const enchere = await prisma.auction.create({
      data: {
        card_id: cardId,
        seller_id: user.id,
        bid: startBid,
        end_date: endDate, // 🕒 Stockage utile (sera remplacée à la clôture manuelle si besoin)
      },
    });

    // Mettre à jour la collection
    await prisma.user.update({
      where: { id: user.id },
      data: { collection },
    });

    res.status(200).json({
      message: "Enchère créée avec succès",
      enchere,
    });
  } catch (err) {
    console.error("❌ Erreur dans CreateAuction :", err);
    res.status(401).json({
      message: "Échec de l'authentification ou de la création d'enchère",
    });
  }
}

// =============================
// Fonction pour placer une enchère
// =============================
async function PlaceBid(req, res) {
    const { enchereId, montant } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || !enchereId || !montant) {
        return res.status(400).json({ message: "Token, enchère ou montant manquant" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const bidder = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!bidder) return res.status(404).json({ message: "Acheteur non trouvé" });

        const enchere = await prisma.auction.findUnique({
            where: { id: enchereId },
            include: { seller: true },
        });

        if (!enchere) return res.status(404).json({ message: "Enchère introuvable" });

        if (enchere.seller_id === bidder.id) {
            return res.status(400).json({ message: "Vous ne pouvez pas enchérir sur votre propre enchère" });
        }

        if (enchere.end_date < new Date()) {
            return res.status(400).json({ message: "⏰ L'enchère est déjà terminée" });
        }

        if (montant <= enchere.bid) {
            return res.status(400).json({ message: "Le montant doit être supérieur à l'enchère actuelle" });
        }

        if (bidder.currency < montant) {
            return res.status(400).json({ message: "❌ Monnaie insuffisante" });
        }

        // ✅ Rembourser l'ancien enchérisseur si existant
        if (enchere.bidder_id) {
            await prisma.user.update({
                where: { id: enchere.bidder_id },
                data: {
                    currency: {
                        increment: enchere.bid,
                    },
                },
            });
        }

        // Déduire le montant du nouvel enchérisseur
        await prisma.user.update({
            where: { id: bidder.id },
            data: {
                currency: {
                    decrement: montant,
                },
            },
        });

        // 🔁 Mise à jour de l’enchère
        const updatedAuction = await prisma.auction.update({
            where: { id: enchereId },
            data: {
                bid: montant,
                bidder_id: bidder.id,
            },
        });

        return res.status(200).json({
            message: "✅ Enchère mise à jour",
            enchere: updatedAuction,
        });
    } catch (err) {
        console.error(" Erreur dans PlaceBid:", err.message);
        return res.status(401).json({ message: "Token invalide ou erreur" });
    }
}

// =============================
// Fonction pour récupérer toutes les enchères
// =============================
async function GetAllEncheres(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token manquant" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        // On récupère toutes les enchères avec relations carte, vendeur, enchérisseur
        const encheres = await prisma.auction.findMany({
            include: {
                card: true,
                seller: { select: { id: true, username: true } },
                bidder: { select: { id: true, username: true } },
            },
            orderBy: {
                end_date: 'asc',
            }
        });

        res.status(200).json({ message: "Liste des enchères", encheres });

    } catch (err) {
        console.error("❌ Erreur GetAllEncheres:", err.message);
        res.status(401).json({ message: "Token invalide" });
    }
}
// =============================


// =============================
// Fonction pour clôturer une enchère
// =============================
async function CloturerEnchere(req, res) {
  const { auctionId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || !auctionId) {
    return res.status(400).json({ message: "Token ou ID enchère manquant" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const enchere = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        seller: true,
        bidder: true,
        card: true,
      },
    });

    if (!enchere) return res.status(404).json({ message: "Enchère introuvable" });

    const isVendeur = enchere.seller_id === userId;
    const isAcheteur = enchere.bidder_id === userId;

    if (!isVendeur && !isAcheteur) {
      return res.status(403).json({ message: "⛔ Vous n'avez pas le droit de clôturer cette enchère" });
    }

    // Cas : pas d'enchérisseur → retourner la carte au vendeur
    if (!enchere.bidder_id) {
      let updatedCollection = [];
      try {
        updatedCollection = Array.isArray(enchere.seller.collection)
          ? [...enchere.seller.collection]
          : JSON.parse(enchere.seller.collection);
      } catch {
        return res.status(500).json({ message: "❌ Erreur collection vendeur" });
      }

      const index = updatedCollection.findIndex(c => c.id === enchere.card_id);
      if (index >= 0) {
        updatedCollection[index].count += 1;
      } else {
        updatedCollection.push({ id: enchere.card_id, count: 1 });
      }

      await prisma.user.update({
        where: { id: enchere.seller_id },
        data: { collection: updatedCollection },
      });

      await prisma.auction.delete({ where: { id: auctionId } });

      return res.status(200).json({ message: "🛑 Aucune enchère, carte retournée au vendeur" });
    }

    // ✅ Cas : un gagnant → transfert carte & monnaie
    const bidderCollectionRaw = enchere.bidder.collection;
    let bidderCollection = [];

    try {
      bidderCollection = Array.isArray(bidderCollectionRaw)
        ? [...bidderCollectionRaw]
        : JSON.parse(bidderCollectionRaw);
    } catch {
      return res.status(500).json({ message: "❌ Erreur collection acheteur" });
    }

    const idx = bidderCollection.findIndex(c => c.id === enchere.card_id);
    if (idx >= 0) {
      bidderCollection[idx].count += 1;
    } else {
      bidderCollection.push({ id: enchere.card_id, count: 1 });
    }

    await prisma.user.update({
      where: { id: enchere.seller_id },
      data: {
        currency: { increment: enchere.bid },
      },
    });

    await prisma.user.update({
      where: { id: enchere.bidder_id },
      data: {
        collection: bidderCollection,
      },
    });

    await prisma.auction.delete({ where: { id: auctionId } });

    res.status(200).json({ message: "✅ Enchère clôturée avec succès" });

  } catch (err) {
    console.error("❌ Erreur lors de la clôture :", err.message);
    res.status(401).json({ message: "Token invalide ou erreur serveur" });
  }
}

// =============================

module.exports = {
    CreateAuction,
    PlaceBid,
    GetAllEncheres,
    CloturerEnchere
};