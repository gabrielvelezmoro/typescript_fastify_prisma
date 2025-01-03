import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import userRoutes from "./modules/user/user.route";
const server = Fastify(); 
import {userSchemas} from './modules/user/user.schema'

server.get('/healthcheck', async (request: FastifyRequest, reply: FastifyReply) => { 
  return { hello: 'world' };
});

async function main(){
  for (const schema of userSchemas) {
      server.addSchema(schema)
  }
  try {

    server.register(userRoutes, {prefix: '/api/users'})
    
    await server.listen({port: 3000, host: '0.0.0.0'});
    
    console.log(`Server ready at http://localhost:3000`)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main()