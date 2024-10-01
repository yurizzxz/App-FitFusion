import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { CreateNutritionController } from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.get("/form", (request: FastifyRequest, reply: FastifyReply) => {
    
<<<<<<< HEAD
    let responseText = "```json\n{\n  \"nome\": \"Yuri\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 17,\n  \"altura\": 1.73,\n  \"peso\": 67,\n  \"objetivo\": \"Hipertrofia\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"08:00\",\n      \"nome\": \"Café da Manhã\",\n      \"alimentos\": [\n        \"2 fatias de pão integral\",\n        \"2 ovos mexidos\",\n        \"1 banana\",\n        \"200ml de leite desnatado\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da Manhã\",\n        \"alimentos\": [\n          \"1 iogurte grego natural\",\n          \"1 scoop de whey protein\",\n          \"1 colher de sopa de granola\"\n        ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoço\",\n      \"alimentos\": [\n        \"150g de frango grelhado\",\n        \"1 xícara de arroz integral\",\n        \"1 xícara de brócolis cozido\",\n        \"Salada verde à vontade\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da Tarde\",\n      \"alimentos\": [\n        \"1 batata doce média\",\n        \"1 scoop de whey protein\"\n      ]\n    },\n    {\n      \"horario\": \"20:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de carne vermelha magra\",\n        \"1 xícara de batata doce cozida\",\n        \"1 xícara de couve refogada\",\n        \"Salada verde à vontade\"\n      ]\n    },\n    {\n      \"horario\": \"22:00\",\n      \"nome\": \"Lanche antes de dormir\",\n        \"alimentos\": [\n          \"200ml de leite desnatado\",\n          \"1 scoop de caseína\"\n        ]\n    }\n  ],\n  \"suplementos\": [\n    \"Whey Protein\",\n    \"Creatina\",\n    \"BCAA\",\n    \"Glutamina\"\n  ]\n}\n```"

    try{
=======
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
>>>>>>> dev

      //Extrair o JSON
      let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

      let jsonObject = JSON.parse(jsonString)

      return reply.send({ data: jsonObject });   

    }catch(err){
      console.log(err)
    }



    reply.send({ ok: true })
  })

<<<<<<< HEAD
  fastify.post("/form", async (request: FastifyRequest, reply: FastifyReply) => {
=======
  fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
>>>>>>> dev
    return new CreateNutritionController().handle(request, reply)
  })


}