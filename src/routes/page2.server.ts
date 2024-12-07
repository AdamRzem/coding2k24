// +page.ts (or +server.ts for older versions)

import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import * as table from "$lib/server/db/schema"
import { count, desc } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  const res = await db.select({ count: count() }).from(table.user)
  return {user:res[0]}
};
