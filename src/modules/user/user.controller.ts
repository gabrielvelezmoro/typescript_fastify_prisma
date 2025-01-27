import { FastifyRequest, FastifyReply } from "fastify";
import {CreateUserInput, LoginInput} from "./user.schema"
import {createUser, findUserByEmail} from "./user.service"
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export async function registerUserHandler(request: FastifyRequest<{Body: CreateUserInput}>,reply: FastifyReply){
   try {
        const body = request.body
        const user = await createUser(body);
        return reply.code(201).send(user);
   } catch (error) {
        console.log(error)
        return reply.code(500).send(error)
   }
}

export async function loginHandler(request: FastifyRequest<{Body: LoginInput}>, reply: FastifyReply){
     const body = request.body

     const user = await findUserByEmail(body.email)

     if (!user) {
          return reply.code(401).send({message: "Invalid email or password"})
     }

     const correctPassword = verifyPassword({
          candidatePassword: body.password,
          salt: user.salt,
          hash: user.password
     })

     if (correctPassword){
          const {password,salt, ...rest} = user
          console.log(rest)

          return {accessToken: server.jwt.sign(rest)}
     }

     return reply.code(401).send({message: "Invalid email or password"})

}