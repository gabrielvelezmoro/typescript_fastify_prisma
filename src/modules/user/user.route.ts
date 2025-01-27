import { FastifyInstance } from "fastify";
import {loginHandler, registerUserHandler} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post('/',{schema: {body: $ref('createUserSquema')}}, registerUserHandler);

    server.post('/login',{schema:{ body :$ref('loginSchema'), response: {200: $ref('loginResponseSchema')}}  }, loginHandler)
}

export default userRoutes
