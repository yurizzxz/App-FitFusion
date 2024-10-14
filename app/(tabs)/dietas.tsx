import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView, 
} from 'react-native';
import useCustomFonts from "../../assets/fonts/fonts"; 
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const imgbg = require("../../assets/images/bgfundo2.png");

export default function Dietas() {
  const [nutritionData, setNutritionData] = useState(null);
  const fontsLoaded = useCustomFonts();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const fetchNutritionData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('nutritionData');
          if (storedData) {
            setNutritionData(JSON.parse(storedData));
          }
        } catch (error) {
          console.error("Erro ao obter dados:", error);
        }
      };
  
      fetchNutritionData();
    }, []) 
  );

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={imgbg} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Sua dieta está pronta para você!</Text>
            {nutritionData ? (
              <View>
                {nutritionData.data.refeicoes.map((refeicao, index) => (
                  <View key={index} style={styles.card}>
                    <Text style={styles.cardSubtitle}>{refeicao.nome}</Text>
                    <Text style={styles.cardText}>
                      <Text style={styles.bold}>Horário:</Text> {refeicao.horario}
                    </Text>
                    <Text style={styles.cardText}>
                      <Text style={styles.bold}>Alimentos:</Text>
                    </Text>
                    {Array.isArray(refeicao.alimentos) && refeicao.alimentos.map((alimento, alimentoIndex) => (
                      <Text key={alimentoIndex} style={styles.cardText}>{alimento}</Text>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noDataText}>Não foram encontrados dados nutricionais.</Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

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
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },
  scrollContainer: {
    paddingTop: 80,
    padding: 20,
    flexGrow: 1,
    paddingBottom: 80,
  },
  title: {
    fontFamily: 'ArchivoBlack',
    fontSize: width >= 800 ? 75 : width >= 550 ? 63 : width >= 480 ? 55 : width >= 475 ? 45 : width >= 360 ? 45 : 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    
  },
  card: {
    backgroundColor: '#101010',
    borderColor: '#101010',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardSubtitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#00BB83',
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
