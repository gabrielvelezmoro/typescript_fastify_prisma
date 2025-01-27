import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyJWT from "@fastify/jwt"
import userRoutes from "./modules/user/user.route";
import {userSchemas} from './modules/user/user.schema'

export const server = Fastify();


server.register(fastifyJWT, {secret: 'lkjasdlçfajsdflçkjsadçflkjadfçlkjadf'} )

server.decorate("auth", async(request:FastifyRequest, reply: FastifyReply) => {
  try {
     await request.jwtVerify()
  } catch (error) {
    return reply.send(error)
  }
})

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