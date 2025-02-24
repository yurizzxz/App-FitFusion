import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const Header = ({ title }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        marginVertical: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 20,
      },
});

export default Header;
