import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import useCustomFonts from '../../assets/fonts/fonts';

const { width } = Dimensions.get('window');
const imgbg = require('../../assets/images/bgfundo2.png');

// Dados fictícios com descrição
const DATA = [
  { id: '1', title: 'Artigo 1', desc: 'Descrição do Artigo 1' },
  { id: '2', title: 'Artigo 2', desc: 'Descrição do Artigo 2' },
  { id: '3', title: 'Artigo 3', desc: 'Descrição do Artigo 3' },
  { id: '4', title: 'Artigo 4', desc: 'Descrição do Artigo 4' },
  { id: '5', title: 'Artigo 5', desc: 'Descrição do Artigo 5' },
];

const Item = ({ title, desc, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.itemTitle}>{title}</Text>
    <Text style={styles.itemDesc}>{desc}</Text>
  </TouchableOpacity>
);

export default function Treino() {
  const fontsLoaded = useCustomFonts();

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      desc={item.desc}
      onPress={() => alert(`${item.title}: ${item.desc}`)}
    />
  );

  return (
    <View style={styles.imgContainer}>
      <ImageBackground source={imgbg} style={styles.imgBack}>
        <KeyboardAvoidingView style={styles.background} behavior="padding">
          <View style={styles.configContainer}>
            <View style={styles.headerText}>
              <Text style={styles.pagTitle}>Artigos</Text>
            </View>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
            />
          </View>
        </KeyboardAvoidingView>
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
  configContainer: {
    width: '100%',
    flex: 1,
    top: 85
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
    padding: 25,
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
});
