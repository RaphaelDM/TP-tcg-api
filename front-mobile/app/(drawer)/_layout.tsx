import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store"; // ⬅️ Pour gérer le token local

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={({ color, size }) => (
          <Feather name="home" color={color} size={size} />
        )}
        label={"Accueil"}
        onPress={() => {
          router.push("/(drawer)/(tabs)");
        }}
      />

      <DrawerItem
        icon={({ color, size }) => (
          <Feather name="log-out" color={color} size={size} />
        )}
        label={"Déconnexion"}
        onPress={async () => {
          try {
            const token = await SecureStore.getItemAsync("token");

            if (!token) {
              console.warn("Aucun token trouvé dans le SecureStore.");
              return;
            }

            const response = await fetch("http://172.20.10.2:3000/deco", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });

            const json = await response.json();
            console.log("Réponse API déconnexion :", json);

            if (!response.ok) {
              console.warn("Erreur serveur :", json.message || "Inconnue");
            }

            // Suppression du token local
            await SecureStore.deleteItemAsync("token");

            // Redirection vers la page de login
            router.replace("/login");
          } catch (error) {
            console.error("❌ Erreur pendant la déconnexion :", error);
          }
        }}
      />

      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name="cards-playing-outline"
            color={color}
            size={size}
          />
        )}
        label={"Booster"}
        onPress={() => {
          router.push("/(drawer)/(tabs)/booster");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name="image-multiple"
            color={color}
            size={size}
          />
        )}
        label={"Archive API"}
        onPress={() => {
          router.push("/(drawer)/(tabs)/archive");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            color={color}
            size={size}
          />
        )}
        label={"Cartes a débloquer"}
        onPress={() => {
          router.push("/(drawer)/(tabs)/collection");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "front",
        drawerStyle: {
          width: 240,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    />
  );
}
