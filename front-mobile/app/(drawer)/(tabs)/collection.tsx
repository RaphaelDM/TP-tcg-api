import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

interface Card {
  id: number;
  name: string;
  rarity: "common" | "rare" | "legendary";
  image: string;
}

export default function Library() {
  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("http://172.20.10.2:3000/cards")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.cartes);
        setData(json.cartes);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderCard = ({ item }: { item: Card }) => {
    let emoji = "❓";
    if (item.rarity === "common") emoji = "⚪";
    else if (item.rarity === "rare") emoji = "🔷";
    else if (item.rarity === "legendary") emoji = "🟡";

    return (
      <View style={styles.cardBox}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <Text style={styles.cardText}>{emoji} {item.name}</Text>
        <Text style={styles.cardRarity}>{item.rarity.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>🔄 Charger les cartes</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#1DB954" />}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: 50,
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cardBox: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 5,
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  cardRarity: {
    color: "#FFD700",
    fontSize: 12,
    marginTop: 4,
  },
});
