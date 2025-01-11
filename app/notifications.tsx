import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar as RNStatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "./firebaseconfig";
import { collection, query, where, onSnapshot, or } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Notification {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
}

export default function Notifications() {
  const router = useRouter();
  const statusBarHeight = Constants.statusBarHeight;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  const fetchNotifications = () => {
    if (!userEmail) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      const notificationsRef = collection(db, "notifications");

      const q = query(
        notificationsRef,
        or(
          where("userAttribute", "array-contains", userEmail),
          where("userAttribute", "in", ["Todos", "todos"])
        )
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedNotifications: Notification[] = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedNotifications.push({
              id: doc.id,
              title: data.title,
              description: data.description,
              subtitle: data.subtitle,
            });
          });
          setNotifications(fetchedNotifications.reverse());
        } else {
          Alert.alert("Aviso", "Não há notificações para você.");
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
      Alert.alert("Erro", "Não foi possível carregar as notificações.");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RNStatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={[styles.header, { paddingTop: statusBarHeight }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.goBackButton}
        >
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
    backgroundColor: "rgb(7, 7, 7)",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  goBackButton: {
    borderRadius: 5,
  },
  pageTitle: {
    color: "#fff",
    fontSize: 30,
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
  notificationSubtitle: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 5,
  },
  notificationDescription: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 5,
  },
});
