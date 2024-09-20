import React, { useState } from 'react';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar dieta.');
      }

      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRefeicoes = (refeicoes) => {
    if (Array.isArray(refeicoes)) {
      return refeicoes.map((refeicao) => refeicao.replace(/[^a-zA-Z0-9\s]/g, '')); // remove caracteres especiais
    }
    return '';
  };

  return (
    <div>
      <h2>Crie sua Dieta Personalizada</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="weight"
          placeholder="Peso"
          value={formData.weight}
          onChange={handleChange}
        />
        <input
          type="text"
          name="height"
          placeholder="Altura"
          value={formData.height}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Idade"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gênero"
          value={formData.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          name="objective"
          placeholder="Objetivo"
          value={formData.objective}
          onChange={handleChange}
        />
        <input
          type="text"
          name="level"
          placeholder="Nível de Atividade"
          value={formData.level}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Gerando...' : 'Criar Dieta'}
        </button>
      </form>

      {nutritionData && (
        <div>
          <h3>Dieta Gerada:</h3>
          <pre>{JSON.stringify(nutritionData.data.refeicoes, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NutritionForm;
