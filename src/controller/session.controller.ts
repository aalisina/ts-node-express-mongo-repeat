import { Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's pwd
  const user = await validatePassword(req.body); // TODO: create a schema to validate the body
  if (!user) {
    return res.status(401).send("Invalid credentials.");
  }

  // Create a session
  const session = createSession(user._id, req.get("user-agent") || "");
  // Create an access token
  // Create a refresh token
  // Return access and refresh token
}
