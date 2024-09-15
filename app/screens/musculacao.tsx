import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

const Musculacao: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={require('../../assets/images/bgfundo2.png')} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.header}>Musculação</Text>
            </View>
            <Text style={styles.subtitle}>Treino focado no aumento da força e massa muscular através de exercícios com pesos e equipamentos, como halteres e barras.</Text>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Segunda - Feira</Text>
              <Text style={styles.dayContent}>
                Peito e Tríceps{'\n'}
                <Text style={styles.boldText}>Supino Reto:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Supino Inclinado com Halteres:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Crossover:</Text> 3x12-15 repetições{'\n'}
                <Text style={styles.boldText}>Tríceps Pulley:</Text> 4x10-15 repetições{'\n'}
                <Text style={styles.boldText}>Mergulho:</Text> 3x8-12 repetições
              </Text>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Terça - Feira</Text>
              <Text style={styles.dayContent}>
                Peito e Tríceps{'\n'}
                <Text style={styles.boldText}>Remada curvada:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Puxada na barra:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Pull-over:</Text> 3x10-15 repetições{'\n'}
                <Text style={styles.boldText}>Rosca direta:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Rosca alternada:</Text> 3x10-15 repetições
              </Text>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Quarta - Feira</Text>
              <Text style={styles.dayContent}>Descanso ou Treino Leve (Alongamento ou Caminhada)</Text>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Quinta - Feira</Text>
              <Text style={styles.dayContent}>
                Pernas{'\n'}
                <Text style={styles.boldText}>Agachamento:</Text> 4 séries de 8-12 repetições{'\n'}
                <Text style={styles.boldText}>Leg Press:</Text> 4 séries de 8-12 repetições{'\n'}
                <Text style={styles.boldText}>Cadeira Extensora:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Cadeira Flexora:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Elevação de Panturrilha:</Text> 4 séries de 15-20 repetições
              </Text>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Sexta - Feira</Text>
              <Text style={styles.dayContent}>
                Ombros e Trapézio{'\n'}
                <Text style={styles.boldText}>Desenvolvimento com Halteres:</Text> 4 séries de 8-12 repetições{'\n'}
                <Text style={styles.boldText}>Elevação Lateral:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Elevação Frontal:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Encolhimento de Ombros:</Text> 4 séries de 10-15 repetições
              </Text>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Sábado</Text>
              <Text style={styles.dayContent}>
                Abdômen e Core{'\n'}
                <Text style={styles.boldText}>Crunches:</Text> 4 séries de 15-20 repetições{'\n'}
                <Text style={styles.boldText}>Elevação de Pernas:</Text> 4 séries de 15-20 repetições{'\n'}
                <Text style={styles.boldText}>Prancha:</Text> 3 séries de 30-60 segundos
              </Text>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayHeader}>Domingo</Text>
              <Text style={styles.dayContent}>
                Descanso.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
  },
  imgBack: {
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },
  container: {
    top: 20,
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: (width / 2.2) - 90, 
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
    color: '#00FFb3',
    marginBottom: 10,
  },
  dayContent: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 30,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Musculacao;
