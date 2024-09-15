import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get("window");

const TreinoMusculacao: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Treino Calistênico</Text>
      <Text style={styles.subtitle}>Treino que utiliza o próprio peso corporal para desenvolver força, flexibilidade e resistência, com exercícios como flexões e barras.</Text>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Segunda - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Parte Superior:</Text>{"\n"}
          <Text style={styles.boldText}>Flexões:</Text> 4x10-15 repetições{"\n"}
          <Text style={styles.boldText}>Dips (paralela):</Text> 4x8-12 repetições{"\n"}
          <Text style={styles.boldText}>Pull-ups:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Pike push-ups:</Text> 3x10-15 repetições
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Terça - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Parte Inferior e Core:</Text>{"\n"}
          <Text style={styles.boldText}>Agachamentos com peso corporal:</Text> 4x15-20 repetições{"\n"}
          <Text style={styles.boldText}>Afundos:</Text> 4x10-15 repetições por perna{"\n"}
          <Text style={styles.boldText}>Elevação de panturrilha:</Text> 4x15-20 repetições{"\n"}
          <Text style={styles.boldText}>Abdominais em V:</Text> 4x15-20 repetições
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Quarta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Descanso ou Recuperação Ativa:</Text>
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Quinta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Treino Funcional:</Text>{"\n"}
          <Text style={styles.boldText}>Burpees:</Text> 4x10-15 repetições{"\n"}
          <Text style={styles.boldText}>Mountain climbers:</Text> 4x20-30 segundos{"\n"}
          <Text style={styles.boldText}>Jump squats:</Text> 4x10-15 repetições{"\n"}
          <Text style={styles.boldText}>Plank jacks:</Text> 4x20-30 segundos
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Sexta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Parte Superior:</Text>{"\n"}
          <Text style={styles.boldText}>Flexões com elevação de pés:</Text> 4x10-15 repetições{"\n"}
          <Text style={styles.boldText}>Australian pull-ups:</Text> 4x10-15 repetições{"\n"}
          <Text style={styles.boldText}>Dips com peso adicional:</Text> 4x8-12 repetições{"\n"}
          <Text style={styles.boldText}>Diamond push-ups:</Text> 3x10-15 repetições
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Sábado</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Parte Inferior e Core:</Text>{"\n"}
          <Text style={styles.boldText}>Agachamentos pistola (com apoio):</Text> 4x5-10 repetições por perna{"\n"}
          <Text style={styles.boldText}>Saltos em caixa:</Text> 4x10-15 repetições{"\n"}
          <Text style={styles.boldText}>Crunches invertidos:</Text> 4x15-20 repetições{"\n"}
          <Text style={styles.boldText}>Plank:</Text> 3x45-60 segundos
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Domingo</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Descanso ou Atividade Leve:</Text> (Como alongamento ou yoga)
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

export default TreinoMusculacao;
