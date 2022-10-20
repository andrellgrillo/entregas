import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";


interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password}: ICreateClient) {
    // validar se o usuário existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username
      }
    })
    if (clientExists) { 
      throw new Error("Client already exists")
    }

    //criptografar a senha
    const hashPassword = await hash(password, 10)

    //salvar o cliente
    const client = await prisma.clients.create({
      data:{
        username,
        password: hashPassword
      }
    })
    return client
  }
}