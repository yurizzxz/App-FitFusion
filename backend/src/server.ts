import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors, {
    origin: true,
  });
  app.register(routes);

  const PORT = "8081"; // Definindo a porta como string

  try {
    await app.listen({ port: Number(PORT), host: '0.0.0.0' }); // Convertendo para número
    console.log(`Servidor rodando no http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
};

start();
