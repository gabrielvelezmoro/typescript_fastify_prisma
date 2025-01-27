import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

 const createUserSquema = z.object({
    email: z.string({required_error: 'Email is required', invalid_type_error: 'Email must be a string'}).email(),
    name: z.string(),
    password: z.string({required_error: 'Password is required', invalid_type_error: 'Password must be a string'}),
})

const loginSchema = z.object({
    email: z.string({required_error: 'Email is required', invalid_type_error: 'Email must be a string'}).email(),
    password: z.string(),
})

const loginResponseSchema = z.object({
    accessToken: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSquema>
export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref} =  buildJsonSchemas({createUserSquema, loginSchema, loginResponseSchema})