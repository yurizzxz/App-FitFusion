import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import useCustomFonts from "../../assets/fonts/fonts";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

interface Alimento {
  nome: string;
  horario: string;
  alimentos: string[];
}

interface NutritionData {
  data: {
    refeicoes: Alimento[];
  };
}

export default function Dietas() {
  const fontsLoaded = useCustomFonts();
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );

  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const fetchNutritionData = async () => {
        try {
          const storedData = await AsyncStorage.getItem("nutritionData");
          if (storedData) {
            setNutritionData(JSON.parse(storedData) as NutritionData);
          }
        } catch (error) {
          console.error("Erro ao obter dados:", error);
        }
      };

      fetchNutritionData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* StatusBar configurado com fundo escuro e texto claro */}
      <StatusBar style="light" backgroundColor="rgb(7, 7, 7)" />

      <KeyboardAvoidingView style={styles.background}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingTop: statusBarHeight },
          ]}
        >
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
                  {Array.isArray(refeicao.alimentos) &&
                    refeicao.alimentos.map((alimento, alimentoIndex) => (
                      <Text key={alimentoIndex} style={styles.cardText}>
                        {alimento}
                      </Text>
                    ))}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>
              Não foram encontrados dados nutricionais.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
    paddingTop: 30,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    flexGrow: 1,
    paddingBottom: 70,
  },
  title: {
    fontSize: width >= 800 ? 75 : width >= 550 ? 63 : width >= 480 ? 55 : 45,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 5,
    padding: 15,
    marginBottom: 13,
  },
  cardSubtitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#00BB83",
  },
  cardText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  noDataText: {
    color: "#fff",
  },
});
