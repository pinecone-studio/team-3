import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/db',
	out: './src/db/migrations',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		accountId: '8341d4b31e574cb9873ce1bb80671685',
		databaseId: '015264c1-6cf9-4020-9873-a2690e6c6394',
		token: 'SbYseBcRUiFDrLdJOHllbxitdJa9GaKub3FcfTWs',
	},
});
