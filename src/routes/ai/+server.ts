import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
    console.log('event.request.body:', event.request.json());
    const res=await fetch('https://localhost:5005/analyze', {body:await event.request.json(), headers: event.request.headers, method: 'POST'});

    return res;
};