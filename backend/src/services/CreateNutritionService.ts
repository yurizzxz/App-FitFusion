
import { DataProps } from '../controllers/CreateNutritionController'
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateNutritionService {
  async execute({ name, age, gender, height, level, objective, weight }: DataProps){
    
    try{
      const genAI = new GoogleGenerativeAI('AIzaSyBFwgxwDdd5sHxlEnSNXSi2IOzONLizJOQ')
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

      const response = await model.generateContent(`Crie uma dieta completa para uma pessoa chamada ${name}, do sexo ${gender}, com peso atual de ${weight}kg, altura de ${height}m, idade de ${age} anos, com foco em ${objective}. A pessoa tem um nível de atividade ${level}. Para a dieta, considere alimentos comuns da classe média baixa brasileira, incluindo uma diversidade que atenda ao objetivo:

        - Para hipertrofia, inclua fontes de proteína como peito de frango, ovos, feijão e leite; carboidratos complexos como arroz integral, batata-doce e mandioca; e gorduras saudáveis como abacate e óleo de soja.
        - Para emagrecimento e definição, foque em alimentos ricos em fibras, como frutas (banana, maçã), verduras (alface, couve) e legumes (cenoura, beterraba), além de proteínas magras como peixe e peito de frango.
        
        Inclua também sugestões de suplementos, como whey protein e creatina para hipertrofia, ou termogênicos e multivitamínicos para emagrecimento.
        
        Retorne as informações em JSON com as seguintes propriedades: 'nome', 'sexo', 'idade', 'altura', 'peso', 'objetivo', e 'refeicoes', onde 'refeicoes' é um array contendo objetos para cada refeição. Cada refeição deve incluir 'horario', 'nome' e 'alimentos', além de 'suplementos' recomendados para o sexo e objetivo da pessoa. Não retorne nenhuma observação além das passadas no prompt, e todas as propriedades devem estar sem acento.`)
        
      console.log(JSON.stringify(response, null, 2));

      if(response.response && response.response.candidates){
        const jsonText = response.response.candidates[0]?.content.parts[0].text as string;

        //Extrair o JSON
        let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

        let jsonObject = JSON.parse(jsonString)

        return { data: jsonObject }
      }


    }catch(err){
      console.error("Erro JSON: ", err)
      throw new Error("Failed create.")
    }
    
    
  }
}

export { CreateNutritionService }