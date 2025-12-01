import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { createAuth } from '$lib/server/auth';
import { getDrizzleClient } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	const db = getDrizzleClient(event.platform);
	event.locals.db = db;

	const auth = createAuth(event.platform, db);

	return svelteKitHandler({
		auth: auth as any,
		event,
		resolve,
		building
	});
};
