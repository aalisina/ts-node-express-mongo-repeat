import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error: any) {
    logger.error(error);
    // 409 conflict, user with the email already registered
    res.status(409).send(error.message);
  }
}
