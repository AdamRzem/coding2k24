import type { RequestHandler } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    const data = await request.json();
    console.log("Received data from microcontroller:", data);

    return new Response(JSON.stringify({message: "pog"}));
};