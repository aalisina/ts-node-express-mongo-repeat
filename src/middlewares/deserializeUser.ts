import { Request, Response, NextFunction } from "express";
import { get } from "lodash"; // makes it safer to import a property that we don't know exists
import { verifyJwt } from "../utils/jwt.utils";

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    // only if jwt is valid
    res.locals.user = decoded;
    return next();
  }
};
