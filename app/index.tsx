import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView, Dimensions, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from 'react-native';
import 'react-native-reanimated';

export default function Splash() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.replace('/begin');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.imgContainer}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.configContainer}>
          <View style={styles.containerLogo}>
            {loading ? (
              <ActivityIndicator size="large" color="#00BB83" />
            ) : (
              <Image
                style={styles.logoSplash}
                source={require("../assets/images/logo-verde.png")}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    backgroundColor: "#050505",
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
