import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { count } from 'drizzle-orm';
export const load = (async () => {
    const res =await db.select({ emotion: table.morale.dominantEmotion, cnt: count(table.morale) }).from(table.morale).groupBy(table.morale.dominantEmotion).execute();

    return {resp:res};
}) satisfies PageServerLoad;