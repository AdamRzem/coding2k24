// +page.ts (or +server.ts for older versions)

import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import * as table from "$lib/server/db/schema"
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  const res=await db.select().from(table.read).orderBy(desc(table.read.time)).limit(1)
  return {read:res[0]}
};
