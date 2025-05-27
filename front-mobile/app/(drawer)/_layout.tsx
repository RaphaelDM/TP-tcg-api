import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CustomDrawerContent = (props : any) => {
    return (
        
        <DrawerContentScrollView {...props}>
            <DrawerItem
             icon={({ color , size }) =>(
                <Feather name="home" color={color} size={size} />
            )}
            label={'Accueil'}
            onPress={() => {
                router.push('/(drawer)/(tabs)'); 
            }}
            
            />
            <DrawerItem
            icon={({ color , size }) =>(
                <MaterialCommunityIcons name="cards-playing-outline" color={color} size={size} />
            )}
            label={'Booster'}
            onPress={() => {
                router.push('/(drawer)/(tabs)/booster'); 
            }}
            />
            <DrawerItem
            icon={({ color , size }) =>(
                <MaterialCommunityIcons name="image-multiple" color={color} size={size} />
            )}
            label={'Archive API'}
            onPress={() => {
                router.push('/(drawer)/(tabs)/archive'); 
            }}
            />
            <DrawerItem
            icon={({ color , size }) =>(
                <MaterialCommunityIcons name="cards-outline" color={color} size={size} />
            )}
            label={'Cartes a débloquer'}
            onPress={() => {
                router.push('/(drawer)/(tabs)/collection'); 
            }}
            />

        </DrawerContentScrollView>
    );
}


export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "front",
        drawerStyle: {
          width: 240,
        }
      }}
      drawerContent= {(props) => <CustomDrawerContent {...props} />}

    />
  );
}