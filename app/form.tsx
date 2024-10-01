import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, StyleSheet } from 'react-native';

const NutritionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    height: '',
    age: '',
    gender: '',
    objective: '',
    level: '',
  });

  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao gerar dieta.');
      }
      return response.json();
    })
    .then((data) => {
      setNutritionData(data);

    
      localStorage.setItem('nutritionData', JSON.stringify(data));

      window.location.href = '/dietas';
    })
    .catch((error) => {
      console.error('Erro ao enviar dados:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const formatRefeicoes = (refeicoes) => {
    if (Array.isArray(refeicoes)) {
      return refeicoes.map((refeicao) => {
        if (typeof refeicao === 'object' && refeicao !== null) {
          const { horario, nome, alimentos } = refeicao;

          const alimentosFormatados = Array.isArray(alimentos)
            ? alimentos.map((alimento) =>
                typeof alimento === 'string'
                  ? alimento.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF:]/g, '')
                  : alimento
              )
            : typeof alimentos === 'string'
            ? alimentos.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF:]/g, '')
            : alimentos;

          return {
            horario: horario.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF:]/g, ''),
            nome: nome.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF:]/g, ''),
            alimentos: alimentosFormatados,
          };
        }
        return refeicao;
      });
    }
    return [];
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Crie sua Dieta Personalizada</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Peso"
          value={formData.weight}
          onChangeText={(text) => handleChange('weight', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Altura"
          value={formData.height}
          onChangeText={(text) => handleChange('height', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Gênero"
          value={formData.gender}
          onChangeText={(text) => handleChange('gender', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Objetivo"
          value={formData.objective}
          onChangeText={(text) => handleChange('objective', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nível de Atividade"
          value={formData.level}
          onChangeText={(text) => handleChange('level', text)}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar Dieta</Text>
          )}
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#00BB83',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#00BB83',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BB83',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default NutritionForm;
