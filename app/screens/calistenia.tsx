import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

const TreinoMusculacao: React.FC = () => {
  const router = useRouter();
  const imgbg = require("../../assets/images/bgfundo2.png");

  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionPress = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <ImageBackground source={imgbg} style={styles.imgBack}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header title="Treino Calistênico" onBackPress={router.back} />

        <Text style={styles.subtitle}>
          Treino que utiliza o próprio peso corporal para desenvolver força, flexibilidade e resistência, com exercícios como flexões e barras.
        </Text>

        <ScrollView>
          <Accordion
            title="Segunda - Feira: Parte Superior"
            isOpen={activeAccordion === 0}
            onPress={() => handleAccordionPress(0)}
          >
            <Text style={styles.exerciseText}>Flexões: 4x10-15 repetições</Text>
            <Text style={styles.exerciseText}>Dips (paralela): 4x8-12 repetições</Text>
            <Text style={styles.exerciseText}>Pull-ups: 4x6-10 repetições</Text>
            <Text style={styles.exerciseText}>Pike push-ups: 3x10-15 repetições</Text>
          </Accordion>

          <Accordion
            title="Terça - Feira: Parte Inferior e Core"
            isOpen={activeAccordion === 1}
            onPress={() => handleAccordionPress(1)}
          >
            <Text style={styles.exerciseText}>Agachamentos com peso corporal: 4x15-20 repetições</Text>
            <Text style={styles.exerciseText}>Afundos: 4x10-15 repetições por perna</Text>
            <Text style={styles.exerciseText}>Elevação de panturrilha: 4x15-20 repetições</Text>
            <Text style={styles.exerciseText}>Abdominais em V: 4x15-20 repetições</Text>
          </Accordion>

          <Accordion
            title="Quarta - Feira: Descanso ou Recuperação Ativa"
            isOpen={activeAccordion === 2}
            onPress={() => handleAccordionPress(2)}
          >
            <Text style={styles.exerciseText}>Dia de recuperação ou alongamento.</Text>
          </Accordion>

          <Accordion
            title="Quinta - Feira: Treino Funcional"
            isOpen={activeAccordion === 3}
            onPress={() => handleAccordionPress(3)}
          >
            <Text style={styles.exerciseText}>Burpees: 4x10-15 repetições</Text>
            <Text style={styles.exerciseText}>Mountain climbers: 4x20-30 segundos</Text>
            <Text style={styles.exerciseText}>Jump squats: 4x10-15 repetições</Text>
            <Text style={styles.exerciseText}>Plank jacks: 4x20-30 segundos</Text>
          </Accordion>

          <Accordion
            title="Sexta - Feira: Parte Superior"
            isOpen={activeAccordion === 4}
            onPress={() => handleAccordionPress(4)}
          >
            <Text style={styles.exerciseText}>Flexões com elevação de pés: 4x10-15 repetições</Text>
            <Text style={styles.exerciseText}>Australian pull-ups: 4x10-15 repetições</Text>
            <Text style={styles.exerciseText}>Dips com peso adicional: 4x8-12 repetições</Text>
            <Text style={styles.exerciseText}>Diamond push-ups: 3x10-15 repetições</Text>
          </Accordion>

          <Accordion
            title="Sábado: Parte Inferior e Core"
            isOpen={activeAccordion === 5}
            onPress={() => handleAccordionPress(5)}
          >
            <Text style={styles.exerciseText}>Agachamentos pistola (com apoio): 4x5-10 repetições por perna</Text>
            <Text style={styles.exerciseText}>Saltos em caixa: 4x10-15 repetições</Text>
            <Text style={styles.exerciseText}>Crunches invertidos: 4x15-20 repetições</Text>
            <Text style={styles.exerciseText}>Plank: 3x45-60 segundos</Text>
          </Accordion>

          <Accordion
            title="Domingo: Descanso ou Atividade Leve"
            isOpen={activeAccordion === 6}
            onPress={() => handleAccordionPress(6)}
          >
            <Text style={styles.exerciseText}>Descanso ou atividade leve como alongamento ou yoga.</Text>
          </Accordion>
        </ScrollView>
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

export default TreinoMusculacao;
