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
      <Text style={styles.header}>Treino de Musculação Intensa</Text>
      <Text style={styles.subtitle}>Versão avançada da musculação, envolvendo exercícios com alta carga e baixa repetição para maximizar força e hipertrofia muscular.</Text>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Segunda - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Peito e Tríceps:</Text>{"\n"}
          <Text style={styles.boldText}>Supino reto com pausa:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Supino inclinado com halteres:</Text> 3x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Mergulho com peso:</Text> 3x8-12 repetições{"\n"}
          <Text style={styles.boldText}>Tríceps na polia alta:</Text> 3x6-10 repetições
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Terça - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Costas e Bíceps:</Text>{"\n"}
          <Text style={styles.boldText}>Deadlift:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Remada unilateral com halteres:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Puxada na barra:</Text> 3x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Rosca direta com barra:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Rosca martelo:</Text> 3x8-12 repetições
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
          <Text style={styles.boldText}>Pernas:</Text>{"\n"}
          <Text style={styles.boldText}>Agachamento profundo:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Leg press com os pés em posição ampla:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Stiff:</Text> 3x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Panturrilha em pé com carga alta:</Text> 4x12-15 repetições
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Sexta - Feira</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Ombros e Trapézio:</Text>{"\n"}
          <Text style={styles.boldText}>Desenvolvimento militar com barra:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Elevação lateral com halteres pesados:</Text> 4x6-10 repetições{"\n"}
          <Text style={styles.boldText}>Remada alta com barra:</Text> 4x6-10 repetições
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Sábado</Text>
        <Text style={styles.dayContent}>
          <Text style={styles.boldText}>Abdômen e Core:</Text>{"\n"}
          <Text style={styles.boldText}>Crunches com peso:</Text> 4x12-15 repetições{"\n"}
          <Text style={styles.boldText}>Elevação de pernas suspenso:</Text> 4x12-15 repetições{"\n"}
          <Text style={styles.boldText}>Prancha lateral com elevação de quadril:</Text> 3x30-45 segundos
        </Text>
      </View>

      <View style={styles.dayContainer}>
        <Text style={styles.dayHeader}>Domingo</Text>
        <Text style={styles.dayContent}>
          Descanso.
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
