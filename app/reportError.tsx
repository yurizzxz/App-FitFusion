import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "./firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

export default function ReportError() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !email || !description) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const errorReportRef = collection(db, "reportError");
      await addDoc(errorReportRef, {
        name,
        email,
        description,
        timestamp: new Date(),
      });

      Alert.alert("Sucesso", "Erro reportado com sucesso!");
      setName("");
      setEmail("");
      setDescription("");
      router.back();
    } catch (error) {
      console.error("Erro ao enviar o relatório: ", error);
      Alert.alert("Erro", "Não foi possível enviar o relatório. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Reportar Erro</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu Nome"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do Problema"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
    padding: 20,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center", 
  },
  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#101010",
    borderColor: "#252525",
    color: "#fff",
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    height: 130,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#00BB83",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
