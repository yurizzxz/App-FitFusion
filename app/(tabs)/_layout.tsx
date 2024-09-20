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
            backgroundColor: '#0B0B0B',
           
            borderTopColor: 'transparent', 
            height: width >= 395 ? 70 : width >= 360 ? 70 : 58,
           
            paddingHorizontal: 15,
            position: 'absolute', 
           
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
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dietas"
          options={{
            title: 'Dietas',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="treinos"
          options={{
            title: 'Treinos',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'barbell' : 'barbell-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artigos"
          options={{
            title: 'Artigos',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'document' : 'document-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: 'Config',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon size={width >= 395 ? 28.5 : width >= 360 ? 28.5 : 28.5} name={focused ? 'person' : 'person-outline'} color={color} />
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
