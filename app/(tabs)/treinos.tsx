import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
import { db } from "../firebaseconfig";

interface Treino {
  name: string;
  exercises: string[];
}

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

export default function Treino() {
  const [emailUsuario, setEmailUsuario] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [treinos, setTreinos] = useState<Treino[] | null>(null);
  const [selectedTreino, setSelectedTreino] = useState<Treino | null>(null);

  useEffect(() => {
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setEmailUsuario(user.email || "");
            setIsUserLoggedIn(true);
            console.log("Você está logado", user.email)
          } else {
            setIsUserLoggedIn(false);
          }
        });
      })
      .catch((error) => {
        console.error("Erro ao definir persistência:", error);
      });
  }, []);

  useEffect(() => {
    if (isUserLoggedIn && emailUsuario) {
      const fetchPresetData = async () => {
        try {
          const presetsRef = collection(db, "presets");
          const q = query(presetsRef, where("assignedUser", "==", emailUsuario));
          const querySnapshot: QuerySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              setTreinos(data.workouts as Treino[]);
            });
          } else {
            setTreinos(null);
          }
        } catch (error) {
          console.error("Erro ao buscar dados de preset:", error);
        }
      };

      fetchPresetData();
    }
  }, [isUserLoggedIn, emailUsuario]);

  const handleSelectTreino = (treino: Treino) => {
    setSelectedTreino(treino);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight }]}>
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.configContainer}>
          <View style={styles.headerText}>
            <Text style={styles.pagTitle}>Selecione o seu treino</Text>
            <Text style={styles.pagDescription}>
              Selecione o treino de acordo com sua disponibilidade...
            </Text>
          </View>

          {!isUserLoggedIn ? (
            <Text style={styles.noTreinoText}>Você precisa estar logado para acessar os treinos.</Text>
          ) : (
            treinos ? (
              <View>
                <View style={styles.buttonContainer}>
                  {treinos.map((treino, index) => (
                    <Pressable 
                      key={index} 
                      style={styles.selectButton} 
                      onPress={() => handleSelectTreino(treino)}
                    >
                      <Text style={styles.buttonText}>{treino.name}</Text>
                    </Pressable>
                  ))}
                </View>

                {selectedTreino ? (
                  <View style={styles.treinoCard}>
                    <Text style={styles.treinoText}>{selectedTreino.name}</Text>
                    {selectedTreino.exercises.map((exercise, idx) => (
                      <Text key={idx} style={styles.exerciseText}>{exercise}</Text>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noTreinoText}>Selecione um treino para ver os detalhes.</Text>
                )}
              </View>
            ) : (
              <Text style={styles.noTreinoText}>Nenhum treino encontrado para o seu usuário.</Text>
            )
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
  },
  background: {
    flex: 1,
  },
  configContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  headerText: {
    marginBottom: 20,
  },
  pagTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: width >= 800 ? 75 : width >= 550 ? 63 : width >= 480 ? 55 : 45,
    marginBottom: 15,
  },
  pagDescription: {
    color: "#fff",
    fontSize: width >= 480 ? 20 : width >= 390 ? 16 : 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: '#00BB83',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  treinoCard: {
    marginBottom: 15,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: "#252525",
    padding: 20,
    borderRadius: 8,
  },
  treinoText: {
    color: "#00BB83",
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  exerciseText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  noTreinoText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  }
});
