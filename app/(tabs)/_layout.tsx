import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007F66', 
          tabBarInactiveTintColor: '#007F66', 
          tabBarStyle: {
            backgroundColor: '#1B1B1D',
            width: width * 0.85, 
            borderTopColor: 'transparent', 
            height: width >= 395 ? 70 : width >= 360 ? 70 : 58,
            borderRadius: 20, 
            paddingHorizontal: 15,
            position: 'absolute', 
            bottom: 10,
            left: width >= 417 ? "8%" : width >= 395 ? "7.7%" : width >= 380 ? "7.6%" : width <= 370 ? "7.6%" : 25, 
            zIndex: 1000, 
          },
          headerShown: false, 
          tabBarLabelStyle: {
            display: 'none', 
          },
          
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 35 : width >= 360 ? 32 : 28} name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dietas"
          options={{
            title: 'Dietas',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 35 : width >= 360 ? 32 : 28} name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="treinos"
          options={{
            title: 'Treinos',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 35 : width >= 360 ? 32 : 28} name={focused ? 'barbell' : 'barbell-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artigos"
          options={{
            title: 'Artigos',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 35 : width >= 360 ? 32 : 28} name={focused ? 'document' : 'document-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: 'Config',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 35 : width >= 360 ? 32 : 28} name={focused ? 'settings' : 'settings-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
  },
});
