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

const imgbg = "../assets/images/bgfundo2.png";

export default function login() {

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
            <TextInput
              style={styles.input}
              placeholder="Endereço de email"
              autoCorrect={false}
              onChangeText={() => {}
            }
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

            <TouchableOpacity style={styles.btnRegistrar}>
              <View style={styles.textsContainer}>
                <Text style={styles.textTextstyle}>
                  Não tem uma conta?
                  <Text style={styles.registrarText}> Registre-se</Text>
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
    top: -55,
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
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  input: {
    backgroundColor: "#191919",
    width: "90%",
    marginTop: 1.7,
    borderWidth: 1,
    borderColor: "#252525",
    height: 53,
    color: "#707070",
    fontSize: 17,
    padding: 0,
    textAlign: "center",
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    marginTop: 3,
    width: "90%",
    padding: 15,
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
