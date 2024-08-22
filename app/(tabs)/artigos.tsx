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
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const imgbg = "../../assets/images/bgfundo2.png";
const imgbg1 = "../../assets/images/bgfundo2.png";

export default function Config() {
  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <View style={styles.contentpage}>
              <View style={styles.row}>
                <View style={[styles.cardContainer, {}]}>
                  <Image source={require(imgbg1)} style={[styles.card]}></Image>
                  <View style={styles.usersInfo}>
                    <Text style={styles.cardText}>Musculação</Text>
                    <Text style={styles.cardEmail}>emailusuario@gmail.com</Text>
                    <TouchableOpacity style={styles.btnProfile}>
                      <Text style={styles.submitText}>Editar Perfil</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.containerForm}>
                <View style={styles.containerInput}>
                  <Text style={styles.label}>Nome</Text>
                  <View style={styles.formContent}>
                    <TextInput
                      style={styles.input}
                      placeholder="Endereço de email"
                      autoCorrect={false}
                      onChangeText={() => {}}
                    />
                  </View>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.formContent}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite sua senha"
                      autoCorrect={false}
                      onChangeText={() => {}}
                    />
                  </View>
                  <Text style={styles.label}>Redefinir a senha</Text>
                  <View style={styles.formContent}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite sua senha"
                      autoCorrect={false}
                      onChangeText={() => {}}
                    />
                  </View>
                  <Text style={styles.label}>Confirme sua nova senha</Text>
                  <View style={styles.formContent}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite sua senha"
                      autoCorrect={false}
                      onChangeText={() => {}}
                    />
                  </View>
                  <View style={styles.formContent}>
                  <TouchableOpacity style={styles.btnSubmit}>
                      <Text style={styles.submitText}>Confirmar Alterações</Text>
                  </TouchableOpacity>
                  </View>
                </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },
  configContainer: {
    width: "100%",
    flex: 1,
  },

  contentpage: {
    top: width >= 395 ? 50 : width >= 380 ? 45 : width >= 360 ? 43 : 40,
    justifyContent: "center",
    alignItems: "center",
  },

  //card

  row: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    borderRadius: 20,
  },

  card: {
    width: "40%",
    height: "115%",
    backgroundColor: "transparent",
    borderRadius: 20,
    
    overflow: "hidden",
  },

  usersInfo: {
    marginLeft: "auto",
    marginRight: "auto",
    
  },

  cardEmail: {
    marginTop: 5,
    color: "white",
    fontSize: width >= 395 ? 15 : width >= 380 ? 15 : width >= 360 ? 13 : 12,
  },

  cardText: {
    fontSize: width >= 395 ? 28 : width >= 380 ? 22 : 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 0,
  },

  btnProfile: {
    backgroundColor: "#00BB83",
    marginTop: 15,
    width: "100%",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: width >= 395 ? 15 : width >= 380 ? 15 : width >= 360 ? 13 : 12,
    fontWeight: "bold",
  },

  /* input */

  label: {
    color: "#fff",
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: '5%',
  },
  containerForm: {
    width: "100%",
    top: width >= 395 ? 40 : width >= 380 ? 35 : width >= 360 ? 30 : 25,
    alignItems: 'center',
  },
  formContent: {
    width: '90%',
  },
  containerInput: {
    width: "100%",
    padding: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#191919",
    width: "100%",
    marginBottom: 10.7,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#252525",
    height: width >= 395 ? 53 : width >= 380 ? 50 : width >= 360 ? 45 : 43,
    color: "#707070",
    fontSize: 15,
    padding: 0,
    textAlign: "center",
  },

  btnSubmit: {
    backgroundColor: "#00BB83",
    top: width >= 395 ? 15 : width >= 380 ? 15 : width >= 360 ? 12 : 10,
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
