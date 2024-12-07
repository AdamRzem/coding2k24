import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { asc, gt, lt, and } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
    const res = await db.select().from(table.read).orderBy(asc(table.read.time));
    // console.log(res);
    return { readings: res };
}) satisfies PageServerLoad;
export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const from = formData.get('from');
        const to = formData.get('to');
        let res = db.select().from(table.read).orderBy(asc(table.read.time));
        console.log(from, to);
        if (from && typeof from === "string") {
            res = res.where(gt(table.read.time, new Date(from)));
        }
        else if (to && typeof to === "string") {
            res = res.where(lt(table.read.time, new Date(to)));
        }
        else if (from && typeof from === "string" && to && typeof to === "string") {
            res = res.where(and(gt(table.read.time, new Date(from)), lt(table.read.time, new Date(to))));
        }
        return { readings: await res };
    }
};