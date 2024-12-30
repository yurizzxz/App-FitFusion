import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");

type FormData = {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
};

export default function Home() {
  const [nome, setNome] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    weight: "",
    height: "",
    age: "",
    gender: "",
    objective: "",
    level: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();
  
  const statusBarHeight = Constants.statusBarHeight;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Bom Dia");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Boa Tarde");
    } else {
      setGreeting("Boa Noite");
    }
    if (user) {
      const docRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setNome(docSnap.data().name || "Usuário");
            console.log("Usuário autenticado:", user.email); 
          } else {
            console.log("Nenhum documento encontrado!");
          }
        },
        (error) => {
          console.error("Erro ao ouvir mudanças no documento:", error);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  const goTreinos = () => {
    router.push("/treinos");
  };

  const goArtigos = () => {
    router.push("/artigos");
  };

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    const serverUrl = "https://backend-fitfusion.onrender.com/create";

    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao gerar dieta.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);

        AsyncStorage.setItem("nutritionData", JSON.stringify(data)).then(() => {
          setFormData(data);
          router.push("/dietas");
        });
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
        Alert.alert("Erro", "Não foi possível gerar a dieta. Tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });

    if (!formData.weight || !formData.height || !formData.age || !formData.objective) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[{ marginTop: statusBarHeight }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.imgContainer}>
        <ImageBackground style={styles.imgBack}>
          <KeyboardAvoidingView style={styles.background}>
            <View style={styles.configContainer}>
              <View style={styles.containerLogo}>
                <Image
                  style={styles.logoLogin}
                  source={require("../../assets/images/logo-verde.png")}
                />
              </View>
              <View style={styles.configctnerhome}>
                <Text style={styles.headLine}>
                  {greeting}, <Text style={styles.span}>{nome}!</Text>
                </Text>
                <Text style={styles.contenthome}>
                  É fundamental que você dedique tempo para analisar
                  detalhadamente seus treinos.
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.trainButton]}
                    onPress={goTreinos}
                  >
                    <Text style={styles.buttonText}>Treinos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.tipsButton]}
                    onPress={goArtigos}
                  >
                    <Text style={styles.buttonText}>Dicas</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>
                    <Text style={styles.span}>{nome}</Text>, crie sua dieta com
                    IA!
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  >
                    Preencha o formulário para gerar sua dieta personalizada!
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#fff"}
                    placeholder="Peso"
                    value={formData.weight}
                    onChangeText={(text) => handleChange("weight", text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Altura"
                    placeholderTextColor={"#fff"}
                    value={formData.height}
                    onChangeText={(text) => handleChange("height", text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Idade"
                    placeholderTextColor={"#fff"}
                    value={formData.age}
                    onChangeText={(text) => handleChange("age", text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#fff"}
                    placeholder="Gênero"
                    value={formData.gender}
                    onChangeText={(text) => handleChange("gender", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Objetivo"
                    value={formData.objective}
                    onChangeText={(text) => handleChange("objective", text)}
                    placeholderTextColor={"#fff"}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nível de Atividade"
                    value={formData.level}
                    placeholderTextColor={"#fff"}
                    onChangeText={(text) => handleChange("level", text)}
                  />

                  <TouchableOpacity
                    style={styles.formButton}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.formButtonText}>Criar Dieta</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    height: "100%",
  },
  imgBack: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
  },
  configContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 130,
    paddingBottom: 50,
  },
  containerLogo: {
    justifyContent: "center",
    marginBottom: 15,
  },
  logoLogin: {
    width: width > 350 ? 200 : 175,
    height: width > 350 ? 75 : 75,
    borderWidth: 0,
  },
  configctnerhome: {
    paddingHorizontal: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headLine: {
    fontSize: width > 350 ? 47 : 40,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  span: {
    color: "#00FFb3",
  },
  contenthome: {
    maxWidth: 352,
    width: "100%",
    color: "#fff",
    textAlign: "center",
    fontSize: width > 350 ? 16 : 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  trainButton: {
    backgroundColor: "#00BB83",
  },
  tipsButton: {
    backgroundColor: "#1E1E1E",
  },
  buttonText: {
    fontSize: width > 350 ? 25 : 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 250,
    width: "100%",
    marginBottom: 95,
  },

  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },

  input: {
    borderColor: "#1F1F1F",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    color: "#fff",
  },

  formButton: {
    backgroundColor: "#00BB83",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  formButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
