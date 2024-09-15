import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get("window");

const Aerobico: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Treino Aeróbico</Text>
      <Text style={styles.subtitle}>Atividade física que melhora a capacidade cardiovascular e respiratória, geralmente realizada em intensidade moderada a alta, como correr ou pedalar.</Text>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Segunda - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Corrida Leve a Moderada:</Text> 45 minutos.
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Terça - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}> Ciclismo Leve a Moderado:</Text> 45-60 minutos.
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Quarta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Natação Contínua:</Text> 45 minutos.
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Quinta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Corrida Intervalada:</Text> Corrida Rápida por 1 Minuto, Seguida de 2 Minutos de Caminhada (Repetir 10 Vezes).
          </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Sexta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Caminhada Rápida:</Text> 60 minutos.
          </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Sábado</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Atividade ao Ar Livre (Exemplo: Trilha, Caminhada):</Text> 60 minutos.
          </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Domingo</Text>
        <Text style={styles.dayContent}>
          Descanso ou Atividade Leve (Como Yoga ou Alongamento).
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 23,
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  dayContent: {
    fontSize: 20,
    color: '#ccc',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Aerobico;
