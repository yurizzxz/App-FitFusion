import React, { useState } from 'react';
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
  Modal
} from 'react-native';
import useCustomFonts from '../../assets/fonts/fonts';

const { width } = Dimensions.get('window');
const imgbg = require('../../assets/images/bgfundo2.png');

const Artigos = [
  { id: '1', title: 'Artigo 1', desc: 'Descrição do Artigo 1' },
  { id: '2', title: 'Artigo 2', desc: 'Descrição do Artigo 2' },
  { id: '3', title: 'Artigo 3', desc: 'Descrição do Artigo 3' },
  { id: '4', title: 'Artigo 4', desc: 'Descrição do Artigo 4' },
  { id: '5', title: 'Artigo 5', desc: 'Descrição do Artigo 5' },
];

const Item = ({ title, desc, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.itemTitle}>{title}</Text>
    <Text style={styles.itemDesc}>{desc}</Text>
  </TouchableOpacity>
);

export default function Artigo() {
  const fontsLoaded = useCustomFonts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      desc={item.desc}
      onPress={() => {
        setSelectedArticle(item);
        setModalVisible(true);
      }}
    />
  );

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={imgbg} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background} behavior="padding">
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.configContainer}>
              <View style={styles.headerText}>
                <Text style={styles.pagTitle}>Artigos</Text>
              </View>
              <FlatList
                data={Artigos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Modal */}
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
              <Text style={styles.modalTitle}>{selectedArticle?.title}</Text>
              <Text style={styles.modalDesc}>{selectedArticle?.desc}</Text>
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
    paddingVertical: 30,
  },
  configContainer: {
    width: '100%',
    flex: 1,
    paddingVertical: 50,
  },
  headerText: {
    padding: width >= 390 ? 20 : width >= 360 ? 15 : 13,
    paddingLeft: 20,
    width: '95%',
  },
  pagTitle: {
    color: '#fff',
    fontFamily: 'ArchivoBlack',
    lineHeight: width >= 390 ? 55 : 40,
    marginBottom: width >= 800 ? 25 : width >= 550 ? 15 : width >= 480 ? 15 : width >= 360 ? 12 : 10,
    fontSize: width >= 800 ? 75 : width >= 550 ? 63 : width >= 480 ? 55 : width >= 475 ? 45 : width >= 360 ? 45 : 40,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#1E1E1E',
    padding: 22,
    marginVertical: 8,
    borderRadius: 3,
  },
  itemTitle: {
    fontSize: 18,
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
  },
  modalTitle: {
    fontSize: 24,
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
});
