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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseconfig";

const imgbg = "../assets/images/login-registro.webp";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Erro no login:", error.message);
    }
  };

  const goToForgotPassword = () => {
    router.push("/esqueceusenha");
  };

  const goToSignUp = () => {
    router.push("/cadastro");
  };

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.logoLogin}
                source={require("../assets/images/logo-verde.png")}
              />
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.welcomeText}>Bem Vindo Novamente!</Text>
              <TextInput
                placeholderTextColor="#888"
                style={styles.input}
                placeholder="Endereço de email"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                placeholderTextColor="#888"
                style={styles.input}
                placeholder="Digite sua senha"
                autoCorrect={false}
                secureTextEntry
                value={senha}
                onChangeText={(text) => setSenha(text)}
              />

              <TouchableOpacity style={styles.btnSubmit} onPress={handleLogin}>
                <Text style={styles.submitText}>Entrar</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={goToSignUp} style={styles.btnRegistrar}>
                  <Text style={styles.registrarText}>Não tem uma conta?<Text style={{ color: '#00BB83'}}> Registre-se!</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToForgotPassword}>
                  <Text style={styles.registrarText}>Esqueci a senha</Text>
                </TouchableOpacity>
               
              </View>
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
    top: -5,
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
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: 'center',
    gap: 15,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 25,
  },
  btnRegistrar: {
    marginVertical: 0,
    
  },
  registrarText: {
    color: "#fff",
    borderWidth: 1,
  },
});
