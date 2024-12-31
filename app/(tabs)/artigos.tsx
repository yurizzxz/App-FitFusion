import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  StatusBar,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { db } from "../firebaseconfig";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface Artigo {
  id: string;
  title: string;
  desc: string;
  categoria: string;
}

interface ItemProps {
  title: string;
  desc: string;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const Item = ({
  title,
  desc,
  onPress,
  isFavorite,
  onToggleFavorite,
}: ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemHeader}>
      <Text style={styles.itemTitle}>
        {title.length > 30 ? `${title.substring(0, 100)}...` : title}
      </Text>
      <TouchableOpacity onPress={onToggleFavorite}>
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={20}
          color={isFavorite ? "#00BB83" : "#fff"}
        />
      </TouchableOpacity>
    </View>
    <Text style={styles.itemDesc}>
      {desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
    </Text>
  </TouchableOpacity>
);

export default function Artigo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Artigo | null>(null);
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [filteredArtigos, setFilteredArtigos] = useState<Artigo[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const auth = getAuth();

   const router = useRouter();

  const categorias = [
    "todos",
    "suplementacao",
    "hipertrofia",
    "emagrecer",
    "treino",
    "alimentacao",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchFavorites(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const fetchFavorites = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setFavoritos(userDoc.data().favoritos || []);
      }
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  };

  const toggleFavorite = async (artigoId: string) => {
    try {
      const userDocRef = doc(db, "users", userId!);
      const userDoc = await getDoc(userDocRef);
      const isFavorite = favoritos.includes(artigoId);

      if (isFavorite) {
        await updateDoc(userDocRef, {
          favoritos: arrayRemove(artigoId),
        });
      } else {
        await updateDoc(userDocRef, {
          favoritos: arrayUnion(artigoId),
        });
      }

      setFavoritos((prev) =>
        isFavorite ? prev.filter((id) => id !== artigoId) : [...prev, artigoId]
      );
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  };

  useEffect(() => {
    const fetchArtigos = async () => {
      const artigosCollection = collection(db, "artigos");
      const artigoSnapshot = await getDocs(artigosCollection);
      const artigoList = artigoSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Artigo)
      );
      setArtigos(artigoList);
      setFilteredArtigos(artigoList);
    };

    fetchArtigos();
  }, []);

  useEffect(() => {
    if (showFavorites) {
      setFilteredArtigos(
        artigos.filter((article) => favoritos.includes(article.id))
      );
    } else if (categoriaSelecionada === "todos") {
      setFilteredArtigos(artigos);
    } else {
      setFilteredArtigos(
        artigos.filter((article) => article.categoria === categoriaSelecionada)
      );
    }
  }, [categoriaSelecionada, artigos, favoritos, showFavorites]);

  const renderItem = ({ item }: { item: Artigo }) => (
    <Item
      title={item.title}
      desc={item.desc}
      isFavorite={favoritos.includes(item.id)}
      onPress={() => {
        setSelectedArticle(item);
        setModalVisible(true);
      }}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <View style={styles.imgContainer}>
      <ImageBackground style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background} behavior="padding">
          <ScrollView
            contentContainerStyle={[{ paddingTop: StatusBar.currentHeight }]}
          >
            <View style={styles.configContainer}>
              <View>
                <View style={styles.headerText}>
                  <Text style={styles.pagTitle}>Artigos</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                       onPress={() => router.push({ pathname: "/notifications" })}
                    >
                      <MaterialIcons name="notifications-none" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowFavorites((prev) => !prev)}
                    >
                      <MaterialIcons
                        name={showFavorites ? "favorite" : "favorite-border"}
                        size={30}
                        color={showFavorites ? "#00FFb3" : "#fff"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={categoriaSelecionada}
                    onValueChange={(itemValue) =>
                      setCategoriaSelecionada(itemValue)
                    }
                    style={styles.picker}
                  >
                    {categorias.map((categoria) => (
                      <Picker.Item
                        key={categoria}
                        label={
                          categoria.charAt(0).toUpperCase() + categoria.slice(1)
                        }
                        value={categoria}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              {filteredArtigos.length === 0 ? (
                <Text style={styles.noFavoritesText}>
                  Não há artigos favoritos.
                </Text>
              ) : (
                <FlatList
                  data={filteredArtigos}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.list}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <TouchableOpacity style={styles.modalView} activeOpacity={1}>
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedArticle?.title}</Text>
                <Text style={styles.modalDesc}>{selectedArticle?.desc}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalFooter}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
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
    backgroundColor: "rgb(7, 7, 7)",
  },
  configContainer: {
    width: "100%",
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  headerText: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 80,
  },
  pagTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  pickerContainer: {
    borderWidth: 0,
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    backgroundColor: "#101010",
    height: 47,
    width: "100%",
    fontWeight: "bold",
    color: "#00FFb3",
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#252525",
  },
  list: {
    marginTop: 20,
    marginBottom: 75,
  },
  noFavoritesText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  },
  item: {
    marginBottom: 12,
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 5,
    padding: 15,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    width: "80%",
    flexWrap: "wrap",
  },
  itemDesc: {
    color: "#fff",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    backgroundColor: "#1E1E1E",
    borderRadius: 5,
    padding: 20,
    width: "95%",
    maxHeight: "90%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#fff",
    marginBottom: 15,
  },
  modalDesc: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 15,
  },
  modalFooter: {
    alignItems: "center",
    top: 7,
    backgroundColor: "#00BB83",
    padding: 10,
  },
  closeButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 5,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
