import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing!"
    });
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJlIiwiaWF0IjoxNjY2MjczNTYyLCJleHAiOjE2NjYzNTk5NjIsInN1YiI6IjdiZjBmNDQxLWU5YWItNGNkNi04MjMxLTM0NzMzMzBlMjI3MiJ9.tjSEZXUrGekHd-1FU_7V2x13d9z4tpSnTNwVL1QLwfE
  //[0] - Bearer
  //[1] - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  const [,token ] = authHeader.split(" ")
  try {
    const { sub } = verify(token, "019acc25a4e242bb77ad489832ada12d") as IPayload

    req.id_deliveryman = sub;

    return next();
  } catch (err) {
      return res.status(401).json({
        message: "Token Invalid!"
    })
  }
}