// =============================
// Dépendances et imports React Native
// =============================
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

// =============================
// Interfaces de données
// =============================
interface Card {
  id: number;
  name: string;
  rarity: "common" | "rare" | "legendary";
  image: string;
  count: number;
}

interface User {
  id: number;
  username: string;
  token: string;
  currency: number;
  collection: Card[];
}

// =============================
// Composant principal
// =============================
export default function Dashboard() {
  // États d’authentification
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // États pour booster / messages
  const [boosterCards, setBoosterCards] = useState<Card[]>([]);
  const [apiMessage, setApiMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [registerMessage, setRegisterMessage] = useState("");
  const [viewMode, setViewMode] = useState<"collection" | "booster" | null>(null);

  // Quantités sélectionnées pour la conversion de doublons
  const [convertQuantities, setConvertQuantities] = useState<{ [cardId: number]: number }>({});

  // =============================
  // Fonctions : Authentification
  // =============================

  const register = async () => {
    setRegisterMessage("");
    const res = await fetch("http://172.20.10.2:3000/inscrit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await res.json();
    if (res.ok) {
      setRegisterMessage("✅ Compte créé avec succès !");
      setMode("login");
    } else {
      setRegisterMessage(json.message || "❌ Erreur lors de l’inscription");
    }
  };

  const login = async () => {
    setLoginError("");
    const res = await fetch("http://172.20.10.2:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await res.json();
    if (res.ok && json.data?.token) {
      setToken(json.data.token);
      setLoginError("");
    } else {
      setLoginError(json.message || "Identifiants invalides");
    }
  };

  const logout = async () => {
    await fetch("http://172.20.10.2:3000/deco", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    // Réinitialise les données
    setToken(null);
    setUserInfo(null);
    setBoosterCards([]);
    setUsername("");
    setPassword("");
  };

  // =============================
  // Récupération des données utilisateur
  // =============================
  const fetchUser = async () => {
    const res = await fetch("http://172.20.10.2:3000/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setUserInfo(json.utilisateur);
  };

  const handleViewProfile = async () => {
    await fetchUser();
    setViewMode("collection");
    setBoosterCards([]);
    setApiMessage("");
  };

  // =============================
  // Booster : Tirage de cartes
  // =============================
  const openBooster = async () => {
    try {
      const res = await fetch("http://172.20.10.2:3000/booster", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (!res.ok) {
        setApiMessage(json.message || "Erreur");
        return;
      }

      setBoosterCards(json.cartesGagnee);
      setApiMessage("🎉 Booster ouvert !");
      setViewMode("booster");
      fetchUser();
    } catch (err) {
      setApiMessage("❌ Erreur réseau");
    }
  };

  // =============================
  // Conversion des doublons
  // =============================
  const handleConvert = async (cardId: number, amount: number) => {
    try {
      const res = await fetch("http://172.20.10.2:3000/convert", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId, amount }),
      });

      const json = await res.json();
      if (res.ok) {
        setApiMessage(json.message);
        fetchUser(); // met à jour la collection
      } else {
        setApiMessage(json.message || "❌ Conversion échouée");
      }
    } catch {
      setApiMessage("❌ Erreur réseau");
    }
  };

  // Met à jour la quantité de cartes à convertir
  const updateConvertAmount = (cardId: number, delta: number, max: number) => {
    setConvertQuantities((prev) => {
      const current = prev[cardId] || 1;
      const newValue = Math.max(1, Math.min(current + delta, max));
      return { ...prev, [cardId]: newValue };
    });
  };

  // ...
  // Ensuite tu peux commenter les blocs JSX si tu veux (login form, booster view, collection view, etc.)
  // ...
  return (
    <ScrollView
      contentContainerStyle={[
        token ? styles.containerConnected : styles.containerCentered,
      ]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      {!token ? (
        <>
          <>
            <Text style={styles.title}>
              {mode === "login" ? "Connexion" : "Inscription"}
            </Text>

            <TextInput
              style={[styles.input, loginError && styles.inputError]}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={[styles.input, loginError && styles.inputError]}
              placeholder="Mot de passe"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {mode === "login" ? (
              <>
                {loginError !== "" && (
                  <Text style={styles.loginErrorText}>{loginError}</Text>
                )}
                <TouchableOpacity style={styles.button} onPress={login}>
                  <Text style={styles.buttonText}>🔐 Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMode("register")}>
                  <Text style={styles.switchModeText}>
                    📝 Pas encore inscrit ? Créer un compte
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {registerMessage !== "" && (
                  <Text style={styles.apiMessage}>{registerMessage}</Text>
                )}
                <TouchableOpacity style={styles.button} onPress={register}>
                  <Text style={styles.buttonText}>✅ Créer un compte</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMode("login")}>
                  <Text style={styles.switchModeText}>
                    🔄 Déjà inscrit ? Se connecter
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        </>
      ) : (
        <>
          <View style={styles.headerContainer}>
            {userInfo && (
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyText}>
                  {userInfo.currency || 0}
                </Text>
                <Text style={styles.currencyIcon}>💰</Text>
              </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleViewProfile}>
              <Text style={styles.buttonText}>👤 Voir mon profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openBooster}>
              <Text style={styles.buttonText}>📦 Ouvrir un booster</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>🔓 Déconnexion</Text>
            </TouchableOpacity>

            {viewMode === "booster" && boosterCards.length > 0 && (
              <Text style={styles.apiMessage}>{apiMessage}</Text>
            )}
            <Text style={styles.apiMessage}>🎁 Cartes gagnée:</Text>

            {boosterCards.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.boosterCardsScroll}
                contentContainerStyle={styles.boosterCardsContainer}
              >
                {boosterCards.map((card, index) => (
                  <View key={index} style={styles.boosterCardBox}>
                    <Image
                      source={{ uri: card.image }}
                      style={styles.boosterCardImage}
                    />
                    <Text style={styles.cardName}>{card.name}</Text>
                    <Text style={styles.cardRarity}>
                      {card.rarity === "common" && "⚪ Common"}
                      {card.rarity === "rare" && "🔷 Rare"}
                      {card.rarity === "legendary" && "🟡 Legendary"}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <Text style={styles.title}>📚 Ma collection :</Text>
          </View>
          <ScrollView
            style={{ width: "100%", paddingBottom: 40, marginBottom: 40 }}
            // nestedScrollEnabled={true}
          >
            {userInfo && (
              <View style={styles.table}>
                {["common", "rare", "legendary"].map((rarity) => (
                  <View key={rarity} style={styles.column}>
                    <Text style={styles.columnTitle}>
                      {rarity === "common" && "⚪ Common"}
                      {rarity === "rare" && "🔷 Rare"}
                      {rarity === "legendary" && "🟡 Legendary"}
                    </Text>

                    {(userInfo.collection || [])
                      .filter((card) => card.rarity === rarity)
                      .map((card, index) => (
                        <View
                          key={index}
                          style={{ alignItems: "center", marginVertical: 8 }}
                        >
                          {card?.image && (
                            <Image
                              source={{ uri: card.image }}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 6,
                                marginBottom: 4,
                              }}
                            />
                          )}
                          <Text style={styles.cardText}>
                            {card.name}{" "}
                            {card.count > 1 ? `(x${card.count})` : ""}
                          </Text>

                          {card.count > 1 && (
                            <View
                              style={{ alignItems: "center", marginTop: 6 }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginBottom: 4,
                                }}
                              >
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#444",
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                  }}
                                  onPress={() =>
                                    updateConvertAmount(
                                      card.id,
                                      -1,
                                      card.count - 1
                                    )
                                  }
                                >
                                  <Text style={{ color: "#fff", fontSize: 16 }}>
                                    –
                                  </Text>
                                </TouchableOpacity>

                                <Text
                                  style={{
                                    marginHorizontal: 10,
                                    color: "#fff",
                                  }}
                                >
                                  {convertQuantities[card.id] || 1}
                                </Text>

                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#444",
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                  }}
                                  onPress={() =>
                                    updateConvertAmount(
                                      card.id,
                                      1,
                                      card.count - 1
                                    )
                                  }
                                >
                                  <Text style={{ color: "#fff", fontSize: 16 }}>
                                    +
                                  </Text>
                                </TouchableOpacity>
                              </View>

                              <TouchableOpacity
                                style={[
                                  styles.button,
                                  {
                                    backgroundColor: "#FF6B6B",
                                    paddingVertical: 6,
                                  },
                                ]}
                                onPress={() =>
                                  handleConvert(
                                    card.id,
                                    convertQuantities[card.id] || 1
                                  )
                                }
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                  }}
                                >
                                  🔁 Convertir
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      ))}
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 12,
  },

  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center", // centre verticalement
    alignItems: "center", // centre horizontalement
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  cardText: {
    color: "#ccc",
    fontSize: 14,
    paddingVertical: 4,
  },
  resultText: {
    color: "#FFD700",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "600",
  },

  apiMessage: {
    color: "#FFD700",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
    maxWidth: 300,
    alignSelf: "center",
  },

  containerConnected: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  containerCentered: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 80,
  },

  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
    gap: 10,
  },
  column: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 8,
  },
  columnTitle: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  inputError: {
    borderColor: "red",
  },

  loginErrorText: {
    color: "red",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  switchModeText: {
    color: "#1DB954",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },

  boosterCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
    marginBottom: 20,
  },

  boosterCardBox: {
    width: 120,
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  boosterCardImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginBottom: 8,
  },

  cardName: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  cardRarity: {
    marginTop: 4,
    color: "#FFD700",
    fontSize: 12,
  },

  boosterCardsScroll: {
    marginTop: 20,
    maxHeight: 180,
  },

  currencyBadge: {
    position: "absolute",
    top: 35,
    right: 10,
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  currencyText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 4,
  },
  currencyIcon: {
    fontSize: 16,
  },
});
