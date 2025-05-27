const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function importCards() {
  try {
    const filePath = path.join(__dirname, "card.json"); 
    const rawData = fs.readFileSync(filePath, "utf-8");
    const cards = JSON.parse(rawData);

    for (const card of cards) {
      await prisma.card.upsert({
        where: { id: card.id },
        update: {}, // évite de dupliquer si déjà présent
        create: {
          id: card.id,
          name: card.name,
          rarity: card.rarity,
          image: card.image,
        },
      });
    }

    console.log(`✅ ${cards.length} cartes importées avec succès.`);
  } catch (err) {
    console.error("❌ Erreur lors de l'import :", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

importCards();
