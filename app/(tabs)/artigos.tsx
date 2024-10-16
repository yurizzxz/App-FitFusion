import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import useCustomFonts from '../../assets/fonts/fonts';
import { db } from "../firebaseconfig";
import { AntDesign } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const { width } = Dimensions.get('window');
const imgbg = require('../../assets/images/bgfundo2.png');

const Item = ({ title, desc, onPress, isFavorite, onToggleFavorite }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemHeader}>
      <Text style={styles.itemTitle}>{title}</Text>
      <TouchableOpacity onPress={onToggleFavorite}>
        <AntDesign name={isFavorite ? 'heart' : 'hearto'} size={20} color={isFavorite ? '#00BB83' : '#fff'} />
      </TouchableOpacity>
    </View>
    <Text style={styles.itemDesc}>
      {desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
    </Text>
  </TouchableOpacity>
);

export default function Artigo() {
  const fontsLoaded = useCustomFonts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [artigos, setArtigos] = useState([]);
  const [filteredArtigos, setFilteredArtigos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false); // Nova variável de estado

  const auth = getAuth();

  const categorias = [
    'todos',
    'suplementacao',
    'hipertrofia',
    'emagrecer',
    'treino',
    'alimentacao',
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

  const fetchFavorites = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setFavoritos(userDoc.data().favoritos || []);
        console.log('Favoritos carregados:', userDoc.data().favoritos);
      }
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    }
  };

  const toggleFavorite = async (artigoId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const isFavorite = favoritos.includes(artigoId);

      if (isFavorite) {
        await updateDoc(userDocRef, {
          favoritos: arrayRemove(artigoId),
        });
        console.log(`Artigo ${artigoId} removido dos favoritos.`);
      } else {
        await updateDoc(userDocRef, {
          favoritos: arrayUnion(artigoId),
        });
        console.log(`Artigo ${artigoId} adicionado aos favoritos.`);
      }

      setFavoritos((prev) =>
        isFavorite ? prev.filter((id) => id !== artigoId) : [...prev, artigoId]
      );
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    }
  };

  useEffect(() => {
    const fetchArtigos = async () => {
      const artigosCollection = collection(db, 'artigos');
      const artigoSnapshot = await getDocs(artigosCollection);
      const artigoList = artigoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArtigos(artigoList);
      setFilteredArtigos(artigoList);
      console.log('Artigos carregados:', artigoList);
    };

    fetchArtigos();
  }, []);

  useEffect(() => {
    if (showFavorites) {
      setFilteredArtigos(artigos.filter(article => favoritos.includes(article.id)));
    } else if (categoriaSelecionada === 'todos') {
      setFilteredArtigos(artigos);
    } else {
      setFilteredArtigos(artigos.filter(article => article.categoria === categoriaSelecionada));
    }
  }, [categoriaSelecionada, artigos, favoritos, showFavorites]);

  const renderItem = ({ item }) => (
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
      <ImageBackground source={imgbg} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background} behavior="padding">
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.configContainer}>
              <View style={styles.headerContent}>
                <View style={styles.headerText}>
                  <Text style={styles.pagTitle}>Artigos</Text>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => {
                      setShowFavorites(prev => !prev);
                      console.log(showFavorites ? 'Mostrando todos os artigos.' : 'Mostrando favoritos.');
                    }}
                  >
                    <AntDesign name={showFavorites ? 'heart' : 'hearto'} size={30} color={showFavorites ? '#00FFb3' : '#fff'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={categoriaSelecionada}
                    onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
                    style={styles.picker}
                  >
                    {categorias.map((categoria) => (
                      <Picker.Item
                        key={categoria}
                        label={categoria.charAt(0).toUpperCase() + categoria.slice(1)}
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
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  scrollContainer: {
    paddingVertical: 55,
  },
  configContainer: {
    width: '100%',
    flex: 1,
    paddingVertical: 20,
    padding: width >= 390 ? 20 : width >= 360 ? 15 : 13,
    paddingLeft: 20,
    top: 10,
  },

  headerText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pagTitle: {
    color: '#fff',
    fontFamily: 'ArchivoBlack',
    lineHeight: width >= 390 ? 55 : 40,
    marginBottom: width >= 800 ? 25 : width >= 550 ? 15 : width >= 480 ? 20 : width >= 360 ? 20 : 10,
    fontSize: width >= 800 ? 75 : width >= 550 ? 63 : width >= 480 ? 55 : width >= 475 ? 45 : width >= 360 ? 45 : 40,
  },
  pickerContainer: {
    borderWidth: 0,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: '#1E1E1E',
    height: 50,
    width: '100%',
    fontWeight: 'bold',
    color: '#00FFb3',
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  list: {
    top: 20,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#1E1E1E',
    padding: 22,
    marginVertical: 8,
    borderRadius: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  itemDesc: {
    fontSize: 14,
    color: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 20,
    width: '90%',
    maxHeight: '85%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fff',
    marginBottom: 15,
  },
  modalDesc: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 15,
  },
  modalFooter: {
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#00BB83',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  favoriteButton: {
    marginRight: 3,
    marginTop: -12,
  },
  noFavoritesText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 18,
  },
});
