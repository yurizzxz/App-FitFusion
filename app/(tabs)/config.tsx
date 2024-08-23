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
    <View>
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.configContainer}>
            <View style={styles.contentpage}>
              <View style={styles.row}>
                <View style={styles.cardContainer}>
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
                      onChangeText={() => {}} secureTextEntry 
                    />
                  </View>
                  <Text style={styles.label}>Confirme sua nova senha</Text>
                  <View style={styles.formContent}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite sua senha" 
                      autoCorrect={false}
                      onChangeText={() => {}} secureTextEntry 
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
  imgBack: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajuste o modo de redimensionamento da imagem
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  configContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentpage: {
    top: -35,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  cardContainer: {
    gap: 20,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 20,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  usersInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cardEmail: {
    marginTop: 5,
    color: '#fff',
    fontSize: 15,
  },
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnProfile: {
    backgroundColor: '#00BB83',
    marginTop: 15,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: '5%',
  },
  containerForm: {
    width: '100%',
    alignItems: 'center',
  },
  formContent: {
    width: '90%',
  },
  containerInput: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#191919',
    width: '100%',
    marginBottom: 10.7,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#252525',
    height: 44,
    color: '#707070',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
  btnSubmit: {
    backgroundColor: '#00BB83',
    width: '100%',
    padding: 20,
    fontSize: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});