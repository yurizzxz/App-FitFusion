
import { DataProps } from '../controllers/CreateNutritionController'
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateNutritionService {
  async execute({ name, age, gender, height, level, objective, weight }: DataProps){
    
    try{
<<<<<<< HEAD
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

      const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`)

=======
      const genAI = new GoogleGenerativeAI('AIzaSyDo9ZrTYtbT93YcEcvKmhTfNh7nGKHO980'
      )
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

      const response = await model.generateContent(`Crie uma dieta completa para uma pessoa chamada ${name}, do sexo ${gender}, com peso atual de ${weight}kg, altura de ${height}m, idade de ${age} anos, com foco em ${objective}. A pessoa tem um nível de atividade ${level}. Para a dieta, considere alimentos comuns da classe média baixa brasileira, incluindo uma diversidade que atenda ao objetivo:

        - Para hipertrofia, inclua fontes de proteína como peito de frango, ovos, feijão e leite; carboidratos complexos como arroz integral, batata-doce e mandioca; e gorduras saudáveis como abacate e óleo de soja.
        - Para emagrecimento e definição, foque em alimentos ricos em fibras, como frutas (banana, maçã), verduras (alface, couve) e legumes (cenoura, beterraba), além de proteínas magras como peixe e peito de frango.
        
        Inclua também sugestões de suplementos, como whey protein e creatina para hipertrofia, ou termogênicos e multivitamínicos para emagrecimento.
        
        Retorne as informações em JSON com as seguintes propriedades: 'nome', 'sexo', 'idade', 'altura', 'peso', 'objetivo', e 'refeicoes', onde 'refeicoes' é um array contendo objetos para cada refeição. Cada refeição deve incluir 'horario', 'nome' e 'alimentos', além de 'suplementos' recomendados para o sexo e objetivo da pessoa. Não retorne nenhuma observação além das passadas no prompt, e todas as propriedades devem estar sem acento.`)
        
>>>>>>> dev
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