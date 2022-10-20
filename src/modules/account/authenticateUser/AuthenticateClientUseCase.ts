import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    //Receber username, password

    //verificar se o username estacadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) {
      throw new Error("Username or password invalid!");      
    }


    //verificar se a senha pertence ao username
    const pmatch = await compare(password, client.password);
    if (!pmatch) {
      throw new Error("Username or password invalid!");
    }

    // gerar o token
    const token = sign({username}, "019acc25a4e242bb55ad489832ada12d", {
      subject: client.id,
      expiresIn: "1d"
    })
    // console.log(token)
    return token

  }
}