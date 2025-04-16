import type { Global } from "@/server/domain/models";

export interface IGlobalRepository {
  getAll(): Promise<Global>;
}
