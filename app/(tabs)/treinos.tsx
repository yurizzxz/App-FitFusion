import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

export default function Treino() {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight}]}>
      <KeyboardAvoidingView
        style={styles.background}
      >
        <View style={styles.configContainer}>
          <View style={styles.headerText}>
            <Text style={styles.pagTitle}>Selecione o seu treino</Text>
            <Text style={styles.pagDescription}>
              Selecione o treino de acordo com sua disponibilidade...
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
  },
  background: {
    flex: 1,
  },
  configContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start', 
  },
  headerText: {
    marginBottom: 20,
  },
  pagTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: width >= 800 ? 75 : width >= 550 ? 63 : width >= 480 ? 55 : 45,
    marginBottom: 15,
  },
  pagDescription: {
    color: "#fff",
    fontSize: width >= 480 ? 20 : width >= 390 ? 16 : 14,
    marginBottom: 20,
  },
});
