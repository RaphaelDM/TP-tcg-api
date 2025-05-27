import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue Dresseur !</Text>
        <Text style={styles.subtitle}>
          Choisis une action pour commencer ton aventure :
        </Text>

        {/* Vers la collection complète */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("collection")}
        >
          <Text style={styles.actionText}>Aperçu des cartes à gagner</Text>
        </TouchableOpacity>

        {/* Vers le booster */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("booster")}
        >
          <Text style={styles.actionText}>Ouvrir un booster</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E5",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
