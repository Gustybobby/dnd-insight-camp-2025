import type { z } from "zod";

import { itemsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Item = createSelectSchema(itemsTable);
export type Item = z.infer<typeof Item>;

export const ItemTypeEnum = Item.shape.type;
export type ItemTypeEnum = z.infer<typeof ItemTypeEnum>;
