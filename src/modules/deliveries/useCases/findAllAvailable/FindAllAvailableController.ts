import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";



export class FindAllAvailableController {
  async handle(req: Request, res: Response) {
    const findAllWithoutEndDateUseCase = new FindAllAvailableUseCase();
    const result = await findAllWithoutEndDateUseCase.execute();
    return res.json(result)
  }
}