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
} from "react-native";
import { useRouter } from "expo-router";
import useCustomFonts from "../assets/fonts/fonts"; 

const imgbg = "../assets/images/bgfundo2.png";
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
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <Text style={styles.headline}>O APLICATIVO FITNESS PERFEITO!</Text>
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
  },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  configContainer: {
    width: "100%",
    alignItems: "center",
    padding: width > 400 ? 15 : 10,
    top: -50,
    justifyContent: "center",
  },

  headline: {
    fontFamily: "Anton",
    fontSize: width > 400 ? 58 : width > 350 ? 50 : 44,
    color: "#fff",
    textAlign: "center",
    lineHeight: width > 400 ? 63 : width > 350 ? 55 : 49,
    marginBottom: 20,
    fontWeight: "bold",
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    marginTop: 1,
    width: "98%",
    padding: 17,
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
    fontSize:  width > 400 ? 18 : width > 350 ? 16 : 14,
    fontWeight: "bold",
  },
});
