import Fastify, { FastifyRequest, FastifyReply } from "fastify";

const server = Fastify(); 

server.get('/', async (request: FastifyRequest, reply: FastifyReply) => { 
  return { hello: 'world' };
});
 
async function main(){
  try {
    await server.listen({port: 3000, host: '0.0.0.0'});
    console.log(`Server ready at http://localhost:3000`)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main()