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
} from "react-native";
import { useRouter } from "expo-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";
import Icon from "react-native-vector-icons/Feather";

const [showPassword, setShowPassword] = useState(false);

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const goLogin = () => {
    router.push("/login");
  };

  const handleGoBack = () => {
    router.push("/begin");
  };

  const handleSignUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      console.log("Usuário criado com UID:", user.uid);

      await setDoc(doc(db, "users", user.uid), {
        name: nome,
        email: email,
      });

      console.log("Nome e email salvos no Firestore.");

      await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado com sucesso!");

      router.push("/home");
    } catch (error) {
      console.error("Erro ao registrar ou logar usuário:", error);
    }
  };
  return (
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-left" size={40} color="#fff" />
      </TouchableOpacity>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.logoLogin}
                source={require("../assets/images/logo-verde.png")}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.welcomeText}>Cadastre-se ao FitFusion!</Text>

              <TextInput
                style={[styles.input, styles.inputSpacing]}
                placeholder="Digite seu nome" 
                placeholderTextColor="#888"
                autoCorrect={false}
                value={nome}
                onChangeText={setNome}
              />

              <TextInput
                style={[styles.input, styles.inputSpacing]}
                placeholder="Endereço de email" 
                placeholderTextColor="#888"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                placeholderTextColor="#888"
                placeholder="Digite sua senha" 
                style={[styles.input, styles.inputSpacing]}
                autoCorrect={false}
                secureTextEntry={!showPassword}
                value={senha}
                onChangeText={(text) => setSenha(text)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon name={showPassword ? "eye" : "eye-off"} size={24} color="#888" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSubmit} onPress={handleSignUp}>
                <Text style={styles.submitText}>Criar conta</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnRegistrar} onPress={goLogin}>
                <View style={styles.textsContainer}>
                  <Text style={styles.textTextstyle}>
                    Já possui uma conta?
                    <Text style={styles.registrarText}> Entrar</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  configContainer: {
    width: "100%",
    alignItems: "center",
    top: -25,
    justifyContent: "center",
  },
  containerLogo: {
    justifyContent: "center",
  },
  logoLogin: {
    width: 200,
    height: 100,
  },
  containerInput: {
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  welcomeText: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    top: -10,
  },
  label: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: "1%",
    marginBottom: 5,
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 50,
    top: 295,
  },
  input: {
    backgroundColor: "#191919",
    width: "98%",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#252525",
    height: 70,
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 18,
  },
  inputSpacing: {
    marginTop: 20,
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    marginTop: 1,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    top: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnRegistrar: {
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  registrarText: {
    color: "#00BB83",
  },
  textsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textTextstyle: {
    color: "#fff",
    top: 25,
    fontSize: 15,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00BB83",
    alignItems: "center",
    justifyContent: "center",
  },
});
