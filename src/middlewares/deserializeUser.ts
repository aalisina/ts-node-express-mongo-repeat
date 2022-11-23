import { Request, Response, NextFunction } from "express";
import { get } from "lodash"; // makes it safer to import a property that we don't know exists
import { reIssueAccessToken } from "../services/session.service";
import { verifyJwt } from "../utils/jwt.utils";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({refreshToken});
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }
    const result = verifyJwt(newAccessToken);
    res.locals.user = result.decoded;
    return next();
  }
  if (decoded) {
    // only if jwt is valid
    res.locals.user = decoded;
    return next();
  }
  next();
};
