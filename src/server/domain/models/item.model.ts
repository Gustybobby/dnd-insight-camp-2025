import type { z } from "zod";

import { itemsTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Item = createSelectSchema(itemsTable);
export type Item = z.infer<typeof Item>;
