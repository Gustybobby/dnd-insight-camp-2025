import type { Session } from "next-auth";

export type AuthSession = Session;

export interface ISessionService {
  getSession(): Promise<AuthSession | null>;
}
