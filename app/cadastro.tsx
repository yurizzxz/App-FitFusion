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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig"; 

const imgbg = "../assets/images/bgfundo2.png";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const goLogin = () => {
    router.push("/login");
  };

  const handleSignUp = async () => {
    const auth = getAuth();
    try {
   
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
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
      <ImageBackground source={require("../assets/images/bgfundo2.png")} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <View style={styles.containerLogo}>
              <Image
                style={styles.logoLogin}
                source={require("../assets/images/logo2.png")}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.welcomeText}>Cadastre-se ao FitFusion!</Text>
              
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>Endereço de email</Text>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity style={styles.btnSubmit} onPress={handleSignUp}>
                <Text style={styles.submitText}>CADASTRAR</Text>
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
    top: -15,
    justifyContent: "center",
  },
  containerLogo: {
    bottom: 10,
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
    width: "90%",
  },
  welcomeText: {
    color: "#fff",
    marginBottom: 25,
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: "1%",
    marginBottom: 5,
    fontSize: 16,
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
    padding: 0,
    textAlign: "center",
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
    fontWeight: "bold",
  },
});