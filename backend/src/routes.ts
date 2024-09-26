import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { CreateNutritionController } from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.get("/form", (request: FastifyRequest, reply: FastifyReply) => {
    
  let responseText = "```json\n{\n  \"nome\": \"Yuri\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 17,\n  \"altura\": 1.73,\n  \"peso\": 68,\n  \"objetivo\": \"Hipertrofia\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"08:00\",\n      \"nome\": \"Café da Manhã\",\n      \"alimentos\": [\n        \"2 fatias de pão integral com queijo\",\n        \"2 ovos mexidos\",\n        \"1 banana\",\n        \"200ml de leite desnatado\",\n        \"1 colher de sopa de manteiga de amendoim\",\n        \"1 tapioca recheada com frango desfiado\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da Manhã\",\n      \"alimentos\": [\n        \"1 iogurte grego natural\",\n        \"1 scoop de whey protein\",\n        \"1 colher de sopa de granola\",\n        \"5 amêndoas\",\n        \"1 maçã\",\n        \"1 fatia de pão integral com pasta de amendoim\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoço\",\n      \"alimentos\": [\n        \"150g de frango grelhado\",\n        \"1 xícara de arroz ou macarrão\",\n        \"1 xícara de brócolis cozido\",\n        \"Salada verde à vontade\",\n        \"50g de feijão\",\n        \"100g de abóbora assada\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da Tarde\",\n      \"alimentos\": [\n        \"1 tapioca com queijo\",\n        \"1 scoop de whey protein\",\n        \"1 colher de sopa de manteiga de amendoim\",\n        \"1 fatia de pão integral com geléia\",\n        \"1 banana\",\n        \"1 iogurte natural\"\n      ]\n    },\n    {\n      \"horario\": \"20:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de carne vermelha magra\",\n        \"1 xícara de arroz integral ou macarrão\",\n        \"1 xícara de couve refogada\",\n        \"Salada verde à vontade\",\n        \"1 fatia de abacate\",\n        \"50g de quinoa\"\n      ]\n    },\n    {\n      \"horario\": \"22:00\",\n      \"nome\": \"Lanche da Noite\",\n      \"alimentos\": [\n        \"200ml de leite desnatado\",\n        \"1 scoop de caseína\",\n        \"1 colher de sopa de sementes de linhaça\",\n        \"1 fatia de queijo cottage\",\n        \"1 porção de iogurte grego\",\n        \"5 nozes\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Whey Protein\",\n    \"Creatina\",\n    \"Hipercalórico\",\n    \"Malto\"\n  ]\n}\n```"; 

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