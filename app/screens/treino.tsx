import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Treino: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Musculação</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Treino;
