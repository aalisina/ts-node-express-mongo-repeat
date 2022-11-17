import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    return logger.info("Connected to DB");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}
export default connect;
