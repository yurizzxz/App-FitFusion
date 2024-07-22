import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
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

export default function Begin() {
  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
          <Text style={styles.headline}>O APLICATIVO FITNESS PERFEITO!</Text>
          <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.submitText}>Começar</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegistrar}>
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
    padding: 35,
    top: -50,
    justifyContent: "center",
  },

  headline:{
    fontSize: 40,
    color: "#fff",
    textAlign: "center",
    lineHeight: 45,
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
    fontSize: 16,
    fontWeight: "bold",
  },
});
