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
import Header from '../../components/header'; 
import { Ionicons } from '@expo/vector-icons'; 

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
      <Header title="Musculação Intensa" onBackPress={router.back} />

      <Text style={styles.subtitle}>
        Treino intenso focado na construção de força e hipertrofia muscular, utilizando pesos pesados e altas repetições.
      </Text>
      
      <Accordion
        title="Segunda - Feira: Peito e Tríceps"
        isOpen={activeAccordion === 0}
        onPress={() => handleAccordionPress(0)}
      >
        <Text style={styles.exerciseText}>Supino Reto com Halteres: 5x6-8 repetições</Text>
        <Text style={styles.exerciseText}>Supino Inclinado com Barra: 5x6-8 repetições</Text>
        <Text style={styles.exerciseText}>Tríceps na Polia Alta: 4x8-10 repetições</Text>
        <Text style={styles.exerciseText}>Flexão de Braços com Peso: 4x8-12 repetições</Text>
        <Text style={styles.exerciseText}>Mergulho em Paralelas: 4x6-10 repetições</Text>
      </Accordion>

      <Accordion
        title="Terça - Feira: Costas e Bíceps"
        isOpen={activeAccordion === 1}
        onPress={() => handleAccordionPress(1)}
      >
        <Text style={styles.exerciseText}>Remada Curvada com Barra: 5x6-8 repetições</Text>
        <Text style={styles.exerciseText}>Puxada na Barra Fixa: 5x6-8 repetições</Text>
        <Text style={styles.exerciseText}>Rosca Direta com Barra: 4x8-10 repetições</Text>
        <Text style={styles.exerciseText}>Puxada com Pegada Aberta: 4x8-12 repetições</Text>
        <Text style={styles.exerciseText}>Rosca Martelo: 4x10-12 repetições</Text>
      </Accordion>

      <Accordion
        title="Quarta - Feira: Pernas"
        isOpen={activeAccordion === 2}
        onPress={() => handleAccordionPress(2)}
      >
        <Text style={styles.exerciseText}>Agachamento Livre: 5x6-8 repetições</Text>
        <Text style={styles.exerciseText}>Leg Press: 5x10-12 repetições</Text>
        <Text style={styles.exerciseText}>Extensora: 4x10-15 repetições</Text>
        <Text style={styles.exerciseText}>Flexora: 4x10-15 repetições</Text>
        <Text style={styles.exerciseText}>Panturrilha em Pé: 5x12-20 repetições</Text>
      </Accordion>

      <Accordion
        title="Quinta - Feira: Ombros e Trapézio"
        isOpen={activeAccordion === 3}
        onPress={() => handleAccordionPress(3)}
      >
        <Text style={styles.exerciseText}>Desenvolvimento com Halteres: 5x6-8 repetições</Text>
        <Text style={styles.exerciseText}>Elevação Lateral com Halteres: 4x10-15 repetições</Text>
        <Text style={styles.exerciseText}>Encolhimento de Ombros: 4x8-10 repetições</Text>
        <Text style={styles.exerciseText}>Elevação Frontal: 4x10-12 repetições</Text>
        <Text style={styles.exerciseText}>Remada Alta: 4x8-10 repetições</Text>
      </Accordion>

      <Accordion
        title="Sexta - Feira: Treino Funcional e Core"
        isOpen={activeAccordion === 4}
        onPress={() => handleAccordionPress(4)}
      >
        <Text style={styles.exerciseText}>Agachamento com Peso: 5x8-12 repetições</Text>
        <Text style={styles.exerciseText}>Flexão de Braços com Abertura: 4x8-12 repetições</Text>
        <Text style={styles.exerciseText}>Burpees: 4x10 repetições</Text>
        <Text style={styles.exerciseText}>Prancha com Peso: 4x30-60 segundos</Text>
        <Text style={styles.exerciseText}>Elevação de Pernas Suspensas: 4x10-15 repetições</Text>
      </Accordion>

      <Accordion
        title="Sábado: Descanso Ativo"
        isOpen={activeAccordion === 5}
        onPress={() => handleAccordionPress(5)}
      >
        <Text style={styles.exerciseText}>Caminhada intensa ou atividades recreativas.</Text>
      </Accordion>

      <Accordion
        title="Domingo: Descanso"
        isOpen={activeAccordion === 6}
        onPress={() => handleAccordionPress(6)}
      >
        <Text style={styles.exerciseText}>Descanso completo para recuperação.</Text>
      </Accordion>
    </KeyboardAvoidingView>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
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
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
