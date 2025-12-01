import { drizzle as drizzleD1, type DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './better-auth-schema';

export type DrizzleClient = DrizzleD1Database<typeof schema>;

export function getDrizzleClient(platform?: App.Platform): DrizzleClient {
	const d1 = platform?.env?.DB;
	if (!d1) {
		throw new Error('Cloudflare D1 binding "DB" is required (configure in wrangler.toml and environment).');
	}

	return drizzleD1(d1, { schema });
}
