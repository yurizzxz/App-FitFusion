import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getAuth,
  updateEmail,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { db } from "../firebaseconfig";
import {
  doc,
  getDoc,
  updateDoc,
  DocumentSnapshot,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "expo-router";

interface UserData {
  name: string;
  email: string;
  registeredAcademy?: string; 
}

const UserProfileScreen = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [registeredAcademy, setRegisteredAcademy] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const auth = getAuth();
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap: DocumentSnapshot = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as UserData;
            setUserName(userData.name || "Nome não disponível");
            setUserEmail(userData.email || "E-mail não disponível");

            const profileImageUrl = userData.profileImage;

            console.log("URL da imagem de perfil: ", profileImageUrl);

            if (profileImageUrl) {
              setProfileImage(profileImageUrl);
            } else {
              setProfileImage("https://via.placeholder.com/100");
            }

            const academyEmail = userData.registeredAcademy;

            console.log("E-mail da academia: ", academyEmail);

            if (academyEmail) {
              const academyDocRef = query(
                collection(db, "academias"),
                where("ownerEmail", "==", academyEmail)
              );
              const querySnapshot = await getDocs(academyDocRef);

              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  const academyData = doc.data();
                  setRegisteredAcademy(
                    academyData?.name || "Academia não registrada"
                  );
                });
              } else {
                setRegisteredAcademy("Academia não encontrada");
              }
            } else {
              setRegisteredAcademy("Academia não registrada");
            }
          } else {
            console.log("Nenhum dado encontrado para este usuário");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [auth, router]);

  const handleConfirmSave = async () => {
    if (!user) {
      Alert.alert(
        "Erro",
        "Usuário não autenticado. Por favor, faça login novamente."
      );
      return;
    }

    try {
      if (newName !== "") {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, { name: newName });
        setUserName(newName);
        Alert.alert("Sucesso", "Nome atualizado com sucesso!");
      }

      if (newEmail !== user.email) {
        await updateEmail(user, newEmail);
        setUserEmail(newEmail);
        Alert.alert(
          "Sucesso",
          "E-mail atualizado com sucesso! Faça login novamente."
        );
        await signOut(auth);
        return;
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      Alert.alert("Erro", "Houve um erro ao atualizar seus dados.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/begin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Houve um erro ao tentar fazer logout.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          style={styles.notificationIcon}
        >
          <MaterialIcons name="notifications-none" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />

        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.role}>{userEmail}</Text>
        <Text style={styles.role}>{registeredAcademy}</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={styles.settingsContainer}>
          {[{ title: "Dados Pessoais", icon: "person" }].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingRow}
              onPress={() => {
                if (item.title === "Dados Pessoais") {
                  setNewName(userName);
                  setNewEmail(userEmail);
                  setModalVisible(true);
                }
              }}
            >
              <MaterialIcons name={item.icon} size={24} color="#fff" />
              <Text style={styles.settingText}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#252525" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.settingsContainer}>
          {[{ title: "Reportar Erro", icon: "bug-report" }].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingRow}
              onPress={() => { router.push ("../reportError"); }}
            >
              <MaterialIcons name={item.icon} size={24} color="#fff" />
              <Text style={styles.settingText}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#252525" />
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Informações</Text>

            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Novo Nome"
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Novo E-mail"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleConfirmSave}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(7, 7, 7)",
  },
  header: {
    alignItems: "center",
    padding: 30,
    paddingTop: 100,
    backgroundColor: "#00bb83",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative",
  },
  notificationIcon: {
    position: "absolute",
    top: 35,
    right: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 10,
  },
  settingsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 20,
    borderWidth: 1,
    backgroundColor: "#101010",
    borderColor: "#252525",
    marginTop: 20,
    borderRadius: 10,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  settingText: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#00bb83",
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#101010",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: "#252525",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#252525",
    color: "#fff",
    borderRadius: 5,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
  },
  logoutButton: {
    padding: 10,
    marginTop: 20,
    backgroundColor: "#00bb83",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default UserProfileScreen;
