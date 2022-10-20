import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    //Receber username, password

    //verificar se o username estacadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliveryman) {
      throw new Error("Username or password invalid!");      
    }


    //verificar se a senha pertence ao username
    const pmatch = await compare(password, deliveryman.password);
    if (!pmatch) {
      throw new Error("Username or password invalid!");
    }

    // gerar o token
    const token = sign({username}, "019acc25a4e242bb77ad489832ada12d", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })
    // console.log(token)
    return token

  }
}