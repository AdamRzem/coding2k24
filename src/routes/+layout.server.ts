import { session } from '$lib/server/db/schema';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
    return { user: event.locals.user, session: event.locals.session };
}) satisfies LayoutServerLoad;