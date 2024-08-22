import React, { useEffect } from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');
const imgbg = "../assets/images/bgfundo2.png";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/begin'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.imgContainer}>
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.configContainer}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logoSplash}
              source={require("../assets/images/logo2.png")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    backgroundColor: "#00BB83",
    height: "100%",
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
    bottom: 10,
  },
  logoSplash: {
    width: 230,
    height: 100,
  },
});
