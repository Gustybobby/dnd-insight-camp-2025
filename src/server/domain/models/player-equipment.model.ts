import type { z } from "zod";

import { playerEquipmentsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const PlayerEquipment = createSelectSchema(playerEquipmentsTable);
export type PlayerEquipment = z.infer<typeof PlayerEquipment>;

export const EquipmentPartEnum = PlayerEquipment.shape.part;
export type EquipmentPartEnum = z.infer<typeof EquipmentPartEnum>;
