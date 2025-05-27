import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Library() {

  // ----------------
  // API Node.js
  const [data, setData] = useState<any[]>([]);
  // ----------------
  const [loading, setLoading] = useState(false);
  // --------------------

  // API Node.js
  const fetchData = () => {
    setLoading(true);
    fetch('http://172.20.10.2:3000/users') // <-- ton IP locale ici
      .then((response) => response.json())
      .then((json) => {
        console.log(json.utilisateurs);
        setData(json.utilisateurs);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // --------------------

  return (
    <View style={styles.container}>
      {/* API Node.js */}
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>🔄 Charger l'api </Text>
      </TouchableOpacity> 
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* API Node.js */}
      <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.userItem}>
        <Text style={styles.userTitle}>👤 {item.username}</Text>
        <Text style={styles.userInfo}>🔒 Mot de passe : {item.password}</Text>
        <Text style={styles.userInfo}>🪙 Token :</Text>
        <Text style={styles.tokenBox}>{item.token}</Text>

        <Text style={styles.userInfo}>📦 Collection :</Text>
        {Array.isArray(item.collection) && item.collection.length > 0 ? (
          <FlatList
              data={item.collection}
              keyExtractor={(card, index) => index.toString()}
              numColumns={2} 
              renderItem={({ item: card }) => {
                let emoji = '❓';
                if (card.rarity === 'common') emoji = '⚪';
                else if (card.rarity === 'rare') emoji = '🔷';
                else if (card.rarity === 'legendary') emoji = '🟡';

                return (
                  <View style={styles.cardBox}>
                    <Text style={styles.cardItem}>
                      {emoji} {card.name}
                    </Text>
                  </View>
                );
              }}
            />
          ) : (
          <Text style={styles.cardEmpty}>Aucune carte</Text>
        )}
      </View>
    )}
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
  userItem: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: "#cccccc",
    marginTop: 4,
  },
  tokenBox: {
    fontSize: 12,
    backgroundColor: "#333",
    padding: 8,
    marginTop: 4,
    borderRadius: 6,
    color: "#aaa",
    fontFamily: "monospace",
  },
  cardEmpty: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#999",
    marginTop: 6,
    marginLeft: 4,
  },
  cardBox: {
    flex: 1,
    margin: 6,
    backgroundColor: "#2c2c2c",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardItem: {
    fontSize: 14,
    color: "#fff",
  },
});
