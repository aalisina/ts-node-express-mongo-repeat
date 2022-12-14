import jwt from "jsonwebtoken";
import config from "config";
import logger from "../utils/logger";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(
  object: Object, // jwt payload
  options?: jwt.SignOptions | undefined // optional param of options
) {
  try {
    return jwt.sign(object, privateKey, {
      ...(options && options), // check if options is defined before we spread it
      algorithm: "RS256", // allow usage of public and private keys
    });
  } catch (err) {
    logger.error(err);
  }
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
