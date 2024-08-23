import React, { useState, useEffect } from "react";

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

const imgbg = "../assets/images/bgfundo2.png";

export default function Cadastro() {
  /* rota */
  const router = useRouter();
  const goLogin = () => {
    router.push("/login");
  };
 
  return (
    <View style={styles.imgContainer}>
      <ImageBackground
        source={require(imgbg)}
        style={styles.imgBack}
        
      >
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
          <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              autoCorrect={false}
              onChangeText={() => {}}
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço de email"
              autoCorrect={false}
              onChangeText={() => {}}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              autoCorrect={false}
              onChangeText={() => {}}
            />
            

            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.submitText}>ENTRAR</Text>
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
      </KeyboardAvoidingView></ImageBackground>
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
    color: "#Fff",
    marginBottom: 25,
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
