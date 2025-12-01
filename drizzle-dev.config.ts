import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/better-auth-schema.ts',
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	out: './migrations',
  dbCredentials: {
    url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/d0bc2e9740fca92d45da860a1b15d6432bd84a44f8c758d899cb8eb4778409f9.sqlite'
  }
});
