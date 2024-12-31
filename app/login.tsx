import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem("userCredentials");
        const savedRememberMe = await AsyncStorage.getItem("rememberMe");

        if (savedCredentials && JSON.parse(savedRememberMe)) {
          const { savedEmail, savedSenha } = JSON.parse(savedCredentials);
          setEmail(savedEmail);
          setSenha(savedSenha);
          setRememberMe(true);

          handleAutoLogin(savedEmail, savedSenha);
        }
      } catch (error) {
        console.error("Erro ao carregar credenciais salvas:", error);
      }
    };

    loadCredentials();
  }, []);

  const handleAutoLogin = async (email: string, senha: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Erro no login automático:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);

      if (rememberMe) {
        await AsyncStorage.setItem(
          "userCredentials",
          JSON.stringify({ savedEmail: email, savedSenha: senha })
        );
        await AsyncStorage.setItem("rememberMe", JSON.stringify(rememberMe));
      } else {
        await AsyncStorage.removeItem("userCredentials");
        await AsyncStorage.setItem("rememberMe", JSON.stringify(false));
      }

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

  const handleGoBack = () => {
    router.push("/begin");
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
            <Text style={styles.welcomeText}>Bem Vindo de Volta!</Text>
            <TextInput
              placeholderTextColor="#888"
              style={styles.input}
              placeholder="Endereço de email"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholderTextColor="#888"
                style={[styles.input, styles.inputSpacing]}
                placeholder="Digite sua senha"
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
            </View>

            <View style={styles.rememberMeRow}>
              <View style={styles.rememberMeContainer}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: "#767577", true: "#00BB83" }}
                  thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
                />
                <Text style={styles.rememberMeText}>Lembrar de mim</Text>
              </View>

              <TouchableOpacity onPress={goToForgotPassword}>
                <Text style={{ color: "#00BB83" }}>Esqueci a senha</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnSubmit} onPress={handleLogin}>
              <Text style={styles.submitText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={goToSignUp}
                style={styles.btnRegistrar}
              >
                <Text style={styles.registrarText}>
                  Não possui uma conta?
                  <Text style={{ color: "#00BB83" }}> Registre-se!</Text>
                </Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "center",
  },
  containerLogo: {
    top: -40,
    justifyContent: "center",
  },
  logoLogin: {
    width: 200,
    height: 100,
  },
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20
  },
  welcomeText: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    top: -20,
  },
  input: {
    backgroundColor: "#191919",
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#252525",
    height: 70,
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 18,
  },
  inputSpacing: {
    marginTop: 20,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 30,
    top: 42,
  },
  rememberMeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rememberMeText: {
    color: "#fff",
    marginLeft: 8,
  },
  registrarText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    marginTop: 1,
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 25,
  },
  btnRegistrar: {
    marginVertical: 0,
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
