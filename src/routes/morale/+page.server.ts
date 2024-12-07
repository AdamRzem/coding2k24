import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { count } from 'drizzle-orm';
import type { Actions } from '../$types';
import { spawn } from "node:child_process";
export const load = (async () => {
    const res =await db.select({ emotion: table.morale.dominantEmotion, cnt: count(table.morale) }).from(table.morale).groupBy(table.morale.dominantEmotion).execute();

    return {resp:res};
}) satisfies PageServerLoad;

export const actions:Actions={
    default: async function (event) {
        console.log("default action");
        spawn("/home/mars/coding2k24/fastAPI/dp/bin/python", ["/home/mars/coding2k24/fastAPI/idk.py"]);        return {status:200};
    }

}