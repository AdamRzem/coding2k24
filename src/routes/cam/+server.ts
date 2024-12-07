import { createInsertSchema } from 'drizzle-zod';
import type { RequestHandler } from './$types';
import * as table from '$lib/server/db/schema';
import { z } from "zod";
import { db } from '$lib/server/db';
export const POST: RequestHandler = async (event) => {
    const moraleSchema = createInsertSchema(table.morale);
    const data = moraleSchema.parse(await event.request.json());
    // console.log(data);
    const res = await db.insert(table.morale).values(data).execute();
    return new Response(JSON.stringify(res), { status: 200 });
};