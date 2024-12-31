import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, StatusBar as RNStatusBar } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";

const notifications = [
  { id: '1', title: 'Nova mensagem', description: 'Você tem uma nova mensagem no app.' },
  { id: '2', title: 'Atualização disponível', description: 'Há uma atualização disponível para o aplicativo.' },
  { id: '3', title: 'Promoção especial', description: 'Aproveite nossa promoção exclusiva por tempo limitado.' },
];

export default function Notifications() {
  const router = useRouter();
  const statusBarHeight = Constants.statusBarHeight;

  const renderNotification = ({ item }: { item: { title: string; description: string } }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RNStatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.header, { paddingTop: statusBarHeight }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Notificações</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.notificationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  goBackButton: {
    borderRadius: 5,
  },
  pageTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  notificationsList: {
    marginTop: 20,
  },
  notificationItem: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#252525",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  notificationTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationDescription: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 5,
  },
});
