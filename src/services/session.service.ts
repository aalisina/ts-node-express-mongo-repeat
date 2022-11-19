import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}
export async function findSessions(query: FilterQuery<SessionDocument>) {
  const sessions = await SessionModel.find(query).lean(); // not going to return all the functions
  // lean() = .toJSON()
  return sessions;
}
