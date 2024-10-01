import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseconfig";

const imgbg = "../assets/images/bgfundo2.png";

export default function EsqueceuSenha() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRecoverPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("E-mail de recuperação enviado com sucesso!");
      Alert.alert("Sucesso", "Verifique seu e-mail para redefinir sua senha.");
    } catch (error) {
      console.error("Erro ao enviar e-mail de recuperação:", error);
      Alert.alert("Erro", "Erro ao enviar e-mail de recuperação: " + error.message);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.logoLogin}
                source={require("../assets/images/logo2.png")}
              />
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.welcomeText}>Recupere sua senha</Text>
              <TextInput
                placeholderTextColor="#888"
                style={styles.input}
                placeholder="Endereço de email"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity style={styles.btnSubmit} onPress={handleRecoverPassword}>
                <Text style={styles.submitText}>Enviar email de redefinição</Text>
              </TouchableOpacity>

              {message ? <Text style={styles.message}>{message}</Text> : null}

              <TouchableOpacity style={styles.btnRegistrar} onPress={goBack}>
                <View style={styles.textsContainer}>
                  <Text style={styles.textTextstyle}>Voltar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },
  configContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    bottom: 25,
    justifyContent: "center",
  },
  logoLogin: {
    width: 200,
    height: 100,
  },
  containerInput: {
    top: -10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  welcomeText: {
    color: "#Fff",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#191919",
    width: "98%",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#252525",
    height: 50,
    color: "#fff",
    fontSize: 17,
    paddingHorizontal: 18,
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    marginTop: 1,
    width: "98%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
  },
  message: {
    marginTop: 10,
    color: "#fff",
    fontSize: 15,
  },
  btnRegistrar: {
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  textsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textTextstyle: {
    color: "#fff",
    fontSize: 15,
  },
});
