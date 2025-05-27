import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: '#000',
          borderTopWidth: 0.5,
          borderTopColor: '#333',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="booster"
        options={{
          title: 'Booster',
          tabBarIcon: ({ color }) =>  <MaterialCommunityIcons name="cards-playing-outline" size={24} color={color} />,
        }}
      />
          <Tabs.Screen
        name="archive"
        options={{
          title: 'Archive',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="image-multiple" size={24} color={color} />,
        }}
      />

        <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cards-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
