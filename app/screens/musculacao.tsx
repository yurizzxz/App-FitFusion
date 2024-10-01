import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header'; 

<<<<<<< HEAD
const { width } = Dimensions.get("window");

const Musculacao: React.FC = () => {
  const navigation = useNavigation();

  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  
  const toggleDay = (day: string) => {
    if (expandedDay === day) {
      setExpandedDay(null); 
    } else {
      setExpandedDay(day); 
    }
  };

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={require('../../assets/images/bgfundo2.png')} style={styles.imgBack}>
    
        {expandedDay && <View style={styles.overlay} />}
        <KeyboardAvoidingView style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.header}>Musculação</Text>
            </View>
            <Text style={styles.subtitle}>
              Treino focado no aumento da força e massa muscular através de exercícios com pesos e equipamentos, como halteres e barras.
            </Text>

            {/* Segunda-Feira */}
            <TouchableOpacity onPress={() => toggleDay("monday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Segunda - Feira</Text>
              <Ionicons name={expandedDay === "monday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "monday" && (
              <Text style={styles.dayContent}>
                Peito e Tríceps{'\n'}
                <Text style={styles.boldText}>Supino Reto:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Supino Inclinado com Halteres:</Text> 4x8-12 repetições
                <Text style={styles.boldText}>Crossover:</Text> 3x12-15 repetições{'\n'}
                <Text style={styles.boldText}>Tríceps Pulley:</Text> 4x10-15 repetições{'\n'}
                <Text style={styles.boldText}>Mergulho:</Text> 3x8-12 repetições
              </Text>
            )}

            {/* Terça-Feira */}
            <TouchableOpacity onPress={() => toggleDay("tuesday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Terça - Feira</Text>
              <Ionicons name={expandedDay === "tuesday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "tuesday" && (
              <Text style={styles.dayContent}>
                Peito e Tríceps{'\n'}
                <Text style={styles.boldText}>Remada curvada:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Puxada na barra:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Pull-over:</Text> 3x10-15 repetições{'\n'}
                <Text style={styles.boldText}>Rosca direta:</Text> 4x8-12 repetições{'\n'}
                <Text style={styles.boldText}>Rosca alternada:</Text> 3x10-15 repetições
              </Text>
            )}

            {/* Quarta-Feira */}
            <TouchableOpacity onPress={() => toggleDay("wednesday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Quarta - Feira</Text>
              <Ionicons name={expandedDay === "wednesday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "wednesday" && (
              <Text style={styles.dayContent}>Descanso ou Treino Leve (Alongamento ou Caminhada)</Text>
            )}

            {/* Quinta-Feira */}
            <TouchableOpacity onPress={() => toggleDay("thursday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Quinta - Feira</Text>
              <Ionicons name={expandedDay === "thursday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "thursday" && (
              <Text style={styles.dayContent}>
                Pernas{'\n'}
                <Text style={styles.boldText}>Agachamento:</Text> 4 séries de 8-12 repetições{'\n'}
                <Text style={styles.boldText}>Leg Press:</Text> 4 séries de 8-12 repetições{'\n'}
                <Text style={styles.boldText}>Cadeira Extensora:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Cadeira Flexora:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Elevação de Panturrilha:</Text> 4 séries de 15-20 repetições
              </Text>
            )}

            {/* Sexta-Feira */}
            <TouchableOpacity onPress={() => toggleDay("friday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Sexta - Feira</Text>
              <Ionicons name={expandedDay === "friday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "friday" && (
              <Text style={styles.dayContent}>
                Ombros e Trapézio{'\n'}
                <Text style={styles.boldText}>Desenvolvimento com Halteres:</Text> 4 séries de 8-12 repetições{'\n'}
                <Text style={styles.boldText}>Elevação Lateral:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Elevação Frontal:</Text> 3 séries de 12-15 repetições{'\n'}
                <Text style={styles.boldText}>Encolhimento de Ombros:</Text> 4 séries de 10-15 repetições
              </Text>
            )}

            {/* Sábado */}
            <TouchableOpacity onPress={() => toggleDay("saturday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Sábado</Text>
              <Ionicons name={expandedDay === "saturday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "saturday" && (
              <Text style={styles.dayContent}>
                Abdômen e Core{'\n'}
                <Text style={styles.boldText}>Crunches:</Text> 4 séries de 15-20 repetições{'\n'}
                <Text style={styles.boldText}>Elevação de Pernas:</Text> 4 séries de 15-20 repetições{'\n'}
                <Text style={styles.boldText}>Prancha:</Text> 3 séries de 30-60 segundos
              </Text>
            )}

            {/* Domingo */}
            <TouchableOpacity onPress={() => toggleDay("sunday")} style={styles.dayHeaderContainer}>
              <Text style={styles.dayHeader}>Domingo</Text>
              <Ionicons name={expandedDay === "sunday" ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {expandedDay === "sunday" && (
              <Text style={styles.dayContent}>Descanso.</Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
=======
const Accordion = ({ title, isOpen, onPress, children }) => {
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onPress}>
        <Text style={styles.headerText}>{title}</Text>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
      </TouchableOpacity>
      <Collapsible collapsed={!isOpen}>
        <View style={styles.content}>
          {children}
        </View>
      </Collapsible>
>>>>>>> dev
    </View>
  );
};

const Musculacao: React.FC = () => {
  const router = useRouter();
  const imgbg = require("../../assets/images/bgfundo2.png");

  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionPress = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <ImageBackground source={imgbg} style={styles.imgBack}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Header title="Musculação" onBackPress={router.back} />
        <Text style={styles.subtitle}>
          Treino focado no aumento da força e massa muscular através de exercícios com pesos e equipamentos, como halteres e barras.
        </Text>
        <Accordion
          title="Segunda - Feira: Peito e Tríceps"
          isOpen={activeAccordion === 0}
          onPress={() => handleAccordionPress(0)}
        >
          <Text style={styles.exerciseText}>Supino Reto: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Supino Inclinado: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Tríceps na Polia: 4x10-15 repetições</Text>
          <Text style={styles.exerciseText}>Flexão de Braços: 3x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Mergulho em Paralelas: 3x6-10 repetições</Text>
        </Accordion>

        <Accordion
          title="Terça - Feira: Costas e Bíceps"
          isOpen={activeAccordion === 1}
          onPress={() => handleAccordionPress(1)}
        >
          <Text style={styles.exerciseText}>Remada Curvada: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Puxada na Barra: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Rosca Direta: 4x10-15 repetições</Text>
          <Text style={styles.exerciseText}>Puxada com Pegada Aberta: 3x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Rosca Martelo: 3x10-12 repetições</Text>
        </Accordion>

        <Accordion
          title="Quarta - Feira: Pernas"
          isOpen={activeAccordion === 2}
          onPress={() => handleAccordionPress(2)}
        >
          <Text style={styles.exerciseText}>Agachamento: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Leg Press: 4x10-15 repetições</Text>
          <Text style={styles.exerciseText}>Extensora: 3x12-15 repetições</Text>
          <Text style={styles.exerciseText}>Flexora: 3x12-15 repetições</Text>
          <Text style={styles.exerciseText}>Panturrilha em Pé: 4x15-20 repetições</Text>
        </Accordion>

        <Accordion
          title="Quinta - Feira: Ombros e Trapézio"
          isOpen={activeAccordion === 3}
          onPress={() => handleAccordionPress(3)}
        >
          <Text style={styles.exerciseText}>Desenvolvimento com Halteres: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Elevação Lateral: 4x10-15 repetições</Text>
          <Text style={styles.exerciseText}>Encolhimento de Ombros: 4x10-15 repetições</Text>
          <Text style={styles.exerciseText}>Elevação Frontal: 3x10-12 repetições</Text>
          <Text style={styles.exerciseText}>Remada Alta: 3x8-12 repetições</Text>
        </Accordion>

        <Accordion
          title="Sexta - Feira: Treino Funcional e Core"
          isOpen={activeAccordion === 4}
          onPress={() => handleAccordionPress(4)}
        >
          <Text style={styles.exerciseText}>Agachamento com Peso: 4x10-15 repetições</Text>
          <Text style={styles.exerciseText}>Flexão de Braços: 4x8-12 repetições</Text>
          <Text style={styles.exerciseText}>Burpees: 3x10 repetições</Text>
          <Text style={styles.exerciseText}>Prancha: 3x30-60 segundos</Text>
          <Text style={styles.exerciseText}>Elevação de Pernas: 3x10-15 repetições</Text>
        </Accordion>

        <Accordion
          title="Sábado: Descanso Ativo"
          isOpen={activeAccordion === 5}
          onPress={() => handleAccordionPress(5)}
        >
          <Text style={styles.exerciseText}>Caminhada leve ou atividades recreativas.</Text>
        </Accordion>

        <Accordion
          title="Domingo: Descanso"
          isOpen={activeAccordion === 6}
          onPress={() => handleAccordionPress(6)}
        >
          <Text style={styles.exerciseText}>Descanso completo.</Text>
        </Accordion>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBack: {
<<<<<<< HEAD
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  container: {
    padding: 20,
    top: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
   
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    
=======
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
>>>>>>> dev
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
<<<<<<< HEAD
    marginBottom: 20,
  },
  dayHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#3b3b3b',
    borderRadius: 5,
    marginVertical: 5,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  dayContent: {
    backgroundColor: '#00BB83',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
=======
    marginBottom: 35,
  },
  accordionContainer: {
    marginBottom: 10,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
>>>>>>> dev
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 7,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#00BB83',
    borderRadius: 5,
  },
  exerciseText: {
  
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Musculacao;
