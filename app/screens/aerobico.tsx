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
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
      </TouchableOpacity>
      <Collapsible collapsed={!isOpen}>
        <View style={styles.content}>
          {children}
        </View>
      </Collapsible>
    </View>
  );
};

const Aerobico: React.FC = () => {
  const router = useRouter();
  const imgbg = require('../../assets/images/bgfundo2.png');

  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionPress = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <ImageBackground source={imgbg} style={styles.imgBack}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header title="Treino Aeróbico" onBackPress={router.back} />

        <Text style={styles.subtitle}>
          Atividade física que melhora a capacidade cardiovascular e respiratória, geralmente realizada em intensidade moderada a alta, como correr ou pedalar.
        </Text>

        <Accordion
          title="Segunda - Feira: Corrida"
          isOpen={activeAccordion === 0}
          onPress={() => handleAccordionPress(0)}
        >
          <Text style={styles.exerciseText}>Corrida leve a moderada: 45 minutos.</Text>
        </Accordion>

        <Accordion
          title="Terça - Feira: Ciclismo"
          isOpen={activeAccordion === 1}
          onPress={() => handleAccordionPress(1)}
        >
          <Text style={styles.exerciseText}>Ciclismo leve a moderado: 45-60 minutos.</Text>
        </Accordion>

        <Accordion
          title="Quarta - Feira: Natação"
          isOpen={activeAccordion === 2}
          onPress={() => handleAccordionPress(2)}
        >
          <Text style={styles.exerciseText}>Natação contínua: 45 minutos.</Text>
        </Accordion>

        <Accordion
          title="Quinta - Feira: Corrida Intervalada"
          isOpen={activeAccordion === 3}
          onPress={() => handleAccordionPress(3)}
        >
          <Text style={styles.exerciseText}>Corrida rápida por 1 minuto, seguida de 2 minutos de caminhada (Repetir 10 vezes).</Text>
        </Accordion>

        <Accordion
          title="Sexta - Feira: Caminhada"
          isOpen={activeAccordion === 4}
          onPress={() => handleAccordionPress(4)}
        >
          <Text style={styles.exerciseText}>Caminhada rápida: 60 minutos.</Text>
        </Accordion>

        <Accordion
          title="Sábado: Atividade ao Ar Livre"
          isOpen={activeAccordion === 5}
          onPress={() => handleAccordionPress(5)}
        >
          <Text style={styles.exerciseText}>Atividade ao ar livre (ex: trilha, caminhada): 60 minutos.</Text>
        </Accordion>

        <Accordion
          title="Domingo: Descanso"
          isOpen={activeAccordion === 6}
          onPress={() => handleAccordionPress(6)}
        >
          <Text style={styles.exerciseText}>Descanso ou atividade leve (como yoga ou alongamento).</Text>
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

export default Aerobico;
