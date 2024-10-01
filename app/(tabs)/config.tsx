import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import {
  getAuth,
  updatePassword,
  updateEmail,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

const { width } = Dimensions.get("window");
const imgbg = "../../assets/images/bgfundo2.png";

const profilePics = [
  require("../../assets/images/profile1.jpg"),
  require("../../assets/images/profile4.jpg"),
  require("../../assets/images/profile2.jpg"),
  require("../../assets/images/profile3.jpg"),
  require("../../assets/images/musculacao.jpg"),
  require("../../assets/images/calistenia.png"),
  require("../../assets/images/aerobico.jpg"),
  require("../../assets/images/intensa.jpg"),
];

export default function Config({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [picModalVisible, setPicModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(profilePics[0]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName(userData.name);
          setUserEmail(userData.email);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getErrorMessage = (error) => {
    if (error.code === "auth/user-not-found") {
      return "Usuário não encontrado";
    }
    if (error.code === "auth/wrong-password") {
      return "Senha inválida";
    }
    return error.message;
  };

  const reauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      console.log("Reautenticação bem-sucedida.");
    } catch (error) {
      console.error("Erro ao reautenticar:", error);
      Alert.alert("Erro", "Reautenticação falhou. Por favor, verifique sua senha.");
      throw error;
    }
  };

  const handleConfirmSave = async () => {
    try {
      await reauthenticate(senhaConfirmacao);

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { name: userName });

      if (userEmail !== user.email) {
        await updateEmail(user, userEmail);
        Alert.alert("Sucesso", "E-mail atualizado com sucesso! Faça login novamente.");
        await signOut(auth);
        return;
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
        Alert.alert("Sucesso", "Dados e senha atualizados com sucesso!");
        await signOut(auth);
      } else {
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Alert.alert("Erro", errorMessage);
      console.error("Erro ao atualizar dados:", errorMessage);
    } finally {
      setModalVisible(false);
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
    <View style={styles.container}>
      <ImageBackground source={require(imgbg)} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.contentpage}>
            <View style={styles.cardContainer}>
              <TouchableOpacity onPress={() => setPicModalVisible(true)}>
                <Image source={profilePic} style={styles.card} />
              </TouchableOpacity>
              <View style={styles.usersInfo}>
                <Text style={styles.cardText}>{userName}</Text>
                <Text style={styles.cardEmail}>{userEmail}</Text>
                <TouchableOpacity
                  style={styles.btnProfile}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.submitText}>Editar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signOut(auth).then(() => navigation.navigate("../begin"))}>
                  <Text style={styles.logoutText}>Fazer Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* modal perfil*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={userName}
                onChangeText={setUserName}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={userEmail}
                onChangeText={setUserEmail}
              />
              <Text style={styles.label}>Nova senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua nova senha"
                value={newPassword}
                secureTextEntry
                onChangeText={setNewPassword}
              />
              <Text style={styles.label}>Confirmar nova senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}
              />
              <Text style={styles.label}>Senha atual</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha atual"
                value={senhaConfirmacao}
                secureTextEntry
                onChangeText={setSenhaConfirmacao}
              />
              <TouchableOpacity style={styles.btnSubmit} onPress={handleConfirmSave}>
                <Text style={styles.submitText}>Confirmar Alterações</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* modal foto d perfil*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={picModalVisible}
          onRequestClose={() => setPicModalVisible(false)}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={() => setPicModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha uma foto de perfil</Text>
              <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                {profilePics.map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.picOption}
                    onPress={() => {
                      setProfilePic(item);
                      setPicModalVisible(false);
                    }}
                  >
                    <Image source={item} style={styles.picImage} />
                  </Pressable>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.btnClose} onPress={() => setPicModalVisible(false)}>
                <Text style={styles.submitText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBack: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },
  contentpage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  usersInfo: {
    alignItems: "center",
  },
  cardEmail: {
    marginTop: 5,
    color: "#fff",
    fontSize: 15,
  },
  cardText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  btnProfile: {
    backgroundColor: "#00BB83",
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#191919",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  picOption: {
    margin: 5,
    padding: 10,
  },
  picImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#252525",
    marginBottom: 15,
    borderRadius: 5,
    height: 44,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  btnSubmit: {
    backgroundColor: "#00BB83",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: 'red',
  },
  btnClose: {
    marginTop: 20,
    backgroundColor: "#00BB83",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
