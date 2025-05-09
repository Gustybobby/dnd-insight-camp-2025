import type { z } from "zod";

import { itemsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Item = createSelectSchema(itemsTable);
export type Item = z.infer<typeof Item>;

export const ItemTypeEnum = Item.shape.type;
export type ItemTypeEnum = z.infer<typeof ItemTypeEnum>;

export const ItemCreate = Item.pick({
  name: true,
  stats: true,
  description: true,
  type: true,
});
export type ItemCreate = z.infer<typeof ItemCreate>;
