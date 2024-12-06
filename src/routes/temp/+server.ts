import type { RequestHandler } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    const data = await request.json();
    console.log("Received data from microcontroller:", data);

    const temp = data.temperature;
    const humid = data.humidity;

    try {
        await db.insert(table.read).values({
            temp: temp,
            humid: humid,
        });
        console.log("works")
    } catch (e) {
        console.error(e)
        return new Response(JSON.stringify({ message: 'An error has occurred' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "pog" }));
};
