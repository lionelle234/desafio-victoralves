import Fastify from 'fastify';
import cors from '@fastify/cors'
import { routes } from './routes';
import { request } from 'http';
import { hostname } from 'os';

const app = Fastify({ logger: true })
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

const start = async() =>{

    await app.register(cors)
    await app.register(routes)
    try{
        await app.listen(PORT, HOST, () => {
            console.log(`server started on port ${PORT}`);
          });
    }
    catch(err){
        process.exit(1)
    }
}

start()