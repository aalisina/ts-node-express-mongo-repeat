import { Request, Response } from "express";
import { createSession, findSessions } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's pwd
  const user = await validatePassword(req.body); // TODO: create a schema to validate the body
  if (!user) {
    return res.status(401).send("Invalid credentials.");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
  );
  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 1y
  );
  // Return access and refresh token
  res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
