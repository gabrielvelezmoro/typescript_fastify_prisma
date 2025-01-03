import { FastifyInstance } from "fastify";
import {registerUserHandler} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post('/',{schema: {body: $ref('createUserSquema')}}, registerUserHandler);
}
export default userRoutes