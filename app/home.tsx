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

export default function home() {
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
            <View style={styles.configctnerhome}>
              <Text style={styles.headLine}>
                Olá, <Text style={styles.span}>USUÁRIO!</Text>
              </Text>
              <Text style={styles.contenthome}>
                É fundamental que você dedique tempo para analisar
                detalhadamente seus treinos.
              </Text>

              <TouchableOpacity style={styles.btnbuttons}>
                <Text style={[styles.treinar, styles.texto]}>Treinos</Text>
                <Text style={[styles.dicas, styles.texto]}>Dicas</Text>
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
    top: -80,
    justifyContent: "center",
  },
  containerLogo: {
    bottom: 20,
    justifyContent: "center",
  },
  logoLogin: {
    width: 200,
    height: 100,
    borderWidth: 0,
  },

  //text config

  configctnerhome: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  headLine: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
  },

  span: {
    color: "#00FFb3",
  },

  contenthome: {
    width: 330,
    top: 10,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  //buttons

  btnbuttons: {
    flexDirection: "row",
    justifyContent: "center",
    top: 40,
  },
  treinar: {
    fontSize: 25,
    height: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#00BB83",
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingLeft: 35,
    paddingRight: 35,
  },
  dicas: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    backgroundColor: "#1E1E1E",
    fontWeight: "bold",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 40,
    paddingRight: 40,
  },

  texto: {
    marginHorizontal: 4,
  },
});
