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
import { getAuth, User, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
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
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [picModalVisible, setPicModalVisible] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<any>(profilePics[0]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const auth = getAuth();

  useEffect(() => {
    const user: User | null = auth.currentUser;

    if (user) {
      setUserEmail(user.email || "Email não definido");

      const fetchUserName = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserName(docSnap.data().name); 
          } else {
            console.log("Nenhum documento encontrado!");
          }
        } catch (error) {
          console.error("Erro ao buscar o nome do usuário:", error);
        }
      };

      fetchUserName();
    }
  }, []);

  const handleProfilePicClose = () => {
    Alert.alert(
      "Confirmar",
      "Você tem certeza de que deseja fechar a seleção de foto de perfil?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => setPicModalVisible(false),
        },
      ]
    );
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword !== "") {
      
    }
    setModalVisible(false);
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("../begin"); 
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível fazer logout.");
      });
  };

  const handleEditProfile = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: userName,
      })
        .then(() => {
          Alert.alert("Sucesso", "Nome atualizado com sucesso!");
          setModalVisible(false);
        })
        .catch((error) => {
          Alert.alert("Erro", "Não foi possível atualizar o nome.");
        });
    }
  };

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
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.logoutText}>Fazer Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Modal para selecionar foto de perfil */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={picModalVisible}
          onRequestClose={handleProfilePicClose}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={() => setPicModalVisible(false)}
          >
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
            >
              <Text style={styles.modalTitle}>Escolha uma foto de perfil</Text>
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollContainer}
              >
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
              <TouchableOpacity
                style={styles.btnClose}
                onPress={handleProfilePicClose}
              >
                <Text style={styles.submitText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Modal para editar perfil */}
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
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
            >
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                autoCorrect={false}
                defaultValue={userName}
                onChangeText={(text) => setUserName(text)}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCorrect={false}
                defaultValue={userEmail}
                onChangeText={(text) => setUserEmail(text)}
              />
              <Text style={styles.label}>Redefinir a senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                autoCorrect={false}
                secureTextEntry
                onChangeText={(text) => setNewPassword(text)}
              />
              <Text style={styles.label}>Confirme sua nova senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                autoCorrect={false}
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                style={styles.btnSubmit}
                onPress={handleEditProfile}
              >
                <Text style={styles.submitText}>Confirmar Alterações</Text>
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
