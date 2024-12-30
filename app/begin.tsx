import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import useCustomFonts from "../assets/fonts/fonts";

const { width } = Dimensions.get("window");

export default function Begin() {
  /* fonte */
  const fontsLoaded = useCustomFonts();

  /* rota */
  const router = useRouter();
  const goCadastro = () => {
    router.push("/cadastro");
  };

  const goLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.imgContainer}>
      <ImageBackground
        source={require("../assets/images/landing.jpeg")}
        style={styles.imgBack}
        resizeMode="cover"
      >
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <Text style={styles.headline}>
              Deixe seu corpo mais saudável{"\n"}e <Text style={styles.strongerText}>mais forte</Text>!
            </Text>
            <Text style={styles.subheadline}>
              O esporte é uma forma de atividade física que geralmente é competitiva e visa aumentar as habilidades e capacidades físicas.
            </Text>
            <TouchableOpacity style={styles.btnSubmit} onPress={goCadastro}>
              <Text style={styles.submitText}>Começar</Text>
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
    justifyContent: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  configContainer: {
    bottom: 50,
    width: "100%",
    padding: width > 400 ? 15 : 15,
    justifyContent: "center",
  },
  headline: {
    fontFamily: 'ArchivoBlack',
    fontSize: width > 400 ? 45 : width > 350 ? 42 : 40,
    color: "#fff",
    textAlign: "left",
    lineHeight: width > 400 ? 50 : width > 350 ? 50 : 49,
    marginBottom: 10,
    fontWeight: "bold",
  },
  strongerText: {
    color: "#00BB83", 
  },
  subheadline: {
    color: "#fff",
    fontSize: width > 400 ? 17.8 : width > 350 ? 17 : 16,
    textAlign: "left",
    marginBottom: 20,
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    marginTop: 1,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  btnRegistrar: {
    width: "100%",
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
    fontSize: width > 400 ? 18 : width > 350 ? 16 : 14,
    fontWeight: "bold",
  },
});
