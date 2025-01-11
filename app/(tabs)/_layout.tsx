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
          tabBarActiveTintColor: '#00cf91',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: '#0B0B0C',
            borderTopColor: 'transparent',
            height: 58,
            position: 'absolute',
            borderRadius: 0,
            zIndex: 1000,
            borderWidth: 0
          },
          headerShown: false,
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIconStyle: {
            position: 'relative',
            top: -1.5
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon size={25} name={focused ? 'home' : 'home-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="dietas"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon size={25} name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="treinos"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon size={25} name={focused ? 'barbell' : 'barbell-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="artigos"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon size={25} name={focused ? 'document' : 'document-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon size={25} name={focused ? 'person' : 'person-outline'} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
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
    bottom: -18,
  },
});
