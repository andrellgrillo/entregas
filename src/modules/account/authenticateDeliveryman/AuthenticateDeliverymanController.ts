import { Request, Response } from 'express';
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

export class AuthenticateDeliverymanController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    const deliveryman = await authenticateDeliverymanUseCase.execute({ username, password })

    return res.json(deliveryman)
  }
}