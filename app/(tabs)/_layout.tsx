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
          tabBarActiveTintColor: '#00BB83',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
<<<<<<< HEAD
            backgroundColor: '#0B0B0B',
           
            borderTopColor: 'transparent', 
            height: width >= 395 ? 70 : width >= 360 ? 70 : 58,
           
=======
            backgroundColor: '#0E0E0E',
            borderTopColor: 'transparent',
            height: width >= 395 ? 70 : width >= 360 ? 70 : 58, 
>>>>>>> dev
            paddingHorizontal: 15,
            position: 'absolute',
            bottom: 10, 
            borderRadius: 50, 
            zIndex: 1000,
          },
          headerShown: false,
          tabBarLabelStyle: {
            display: 'none', 
          },
          tabBarIconStyle: {
            position: 'relative', 
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
<<<<<<< HEAD
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'home' : 'home-outline'} color={color} />
=======
              <View style={styles.iconContainer}>
                <TabBarIcon size={30} name={focused ? 'home' : 'home-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
>>>>>>> dev
            ),
          }}
        />
        <Tabs.Screen
          name="dietas"
          options={{
            title: 'Dietas',
            tabBarIcon: ({ color, focused }) => (
<<<<<<< HEAD
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
=======
              <View style={styles.iconContainer}>
                <TabBarIcon size={30} name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
>>>>>>> dev
            ),
          }}
        />
        <Tabs.Screen
          name="treinos"
          options={{
            title: 'Treinos',
            tabBarIcon: ({ color, focused }) => (
<<<<<<< HEAD
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'barbell' : 'barbell-outline'} color={color} />
=======
              <View style={styles.iconContainer}>
                <TabBarIcon size={30} name={focused ? 'barbell' : 'barbell-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
>>>>>>> dev
            ),
          }}
        />
        <Tabs.Screen
          name="artigos"
          options={{
            title: 'Artigos',
            tabBarIcon: ({ color, focused }) => (
<<<<<<< HEAD
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'document' : 'document-outline'} color={color} />
=======
              <View style={styles.iconContainer}>
                <TabBarIcon size={30} name={focused ? 'document' : 'document-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
>>>>>>> dev
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: 'Config',
            tabBarIcon: ({ color, focused }) => (
<<<<<<< HEAD
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'person' : 'person-outline'} color={color} />
=======
              <View style={styles.iconContainer}>
                <TabBarIcon size={30} name={focused ? 'settings' : 'settings-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
>>>>>>> dev
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
    backgroundColor: '#00BB83', 
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicator: {
    width: 30,
    height: 3,
    backgroundColor: '#00BB83',
    borderRadius: 1.5,
    position: 'absolute',
    bottom: -17, 
  },
});
