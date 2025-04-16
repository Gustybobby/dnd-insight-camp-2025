import type { ModEffect, ModEffectCreate } from "@/server/domain/models";

export interface IEffectRepository {
  createModEffect({ data }: { data: ModEffectCreate }): Promise<ModEffect>;
}
