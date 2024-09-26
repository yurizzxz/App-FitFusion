import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { CreateNutritionController } from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.get("/form", (request: FastifyRequest, reply: FastifyReply) => {
    
    let responseText = "```json\n{\
    \"nome\": \"Yuri\",\
    \"sexo\": \"Masculino\",\
    \"idade\": 17,\
    \"altura\": 1.73,\
    \"peso\": 68,\
    \"objetivo\": \"Hipertrofia\",\
    \"refeicoes\": [\
      {\
        \"horario\": \"08:00\",\
        \"nome\": \"Café da Manhã\",\
        \"alimentos\": [\
          \"2 fatias de pão francês com manteiga\",\
          \"2 ovos cozidos ou mexidos\",\
          \"1 banana\",\
          \"200ml de leite\",\
          \"1 fatia de queijo\",\
          \"1 xícara de café preto\"\
        ]\
      },\
      {\
        \"horario\": \"10:00\",\
        \"nome\": \"Lanche da Manhã\",\
        \"alimentos\": [\
          \"1 iogurte natural\",\
          \"1 fatia de pão integral com requeijão\",\
          \"1 maçã\",\
          \"1 punhado de castanhas ou amendoim\"\
        ]\
      },\
      {\
        \"horario\": \"13:00\",\
        \"nome\": \"Almoço\",\
        \"alimentos\": [\
          \"150g de frango grelhado ou cozido\",\
          \"1 xícara de arroz\",\
          \"1 xícara de feijão\",\
          \"1 xícara de brócolis ou couve refogada\",\
          \"salada de alface e tomate\",\
          \"1 batata cozida\"\
        ]\
      },\
      {\
        \"horario\": \"16:00\",\
        \"nome\": \"Lanche da Tarde\",\
        \"alimentos\": [\
          \"1 fatia de pão com queijo e presunto\",\
          \"1 banana\",\
          \"1 bolacha cream cracker\",\
          \"1 copo de suco de laranja\"\
        ]\
      },\
      {\
        \"horario\": \"20:00\",\
        \"nome\": \"Jantar\",\
        \"alimentos\": [\
          \"150g de carne moída ou frango\",\
          \"1 xícara de arroz\",\
          \"1 xícara de legumes cozidos (como cenoura e abobrinha)\",\
          \"salada de repolho e cenoura\",\
          \"1 fatia de abacate\"\
        ]\
      },\
      {\
        \"horario\": \"22:00\",\
        \"nome\": \"Lanche da Noite\",\
        \"alimentos\": [\
          \"200ml de leite com achocolatado\",\
          \"1 fatia de pão com manteiga\",\
          \"1 porção de frutas da estação\"\
        ]\
      }\
    ],\
    \"suplementos\": [\
      \"Whey Protein\",\
      \"Creatina\"\
    ]\
  }\n```";
      try{

      //Extrair o JSON
      let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

      let jsonObject = JSON.parse(jsonString)

      return reply.send({ data: jsonObject });   

    }catch(err){
      console.log(err)
    }



    reply.send({ ok: true })
  })

  fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateNutritionController().handle(request, reply)
  })


}