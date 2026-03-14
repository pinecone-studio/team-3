import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { typeDefs } from '.././graphql/schemas';
import { resolvers } from '.././graphql/resolvers';
const server = new ApolloServer<Context>({
	typeDefs,
	resolvers,
	introspection: true,
});

export const handler = startServerAndCreateCloudflareWorkersHandler<Env, Context>(server, {
	context: async ({ env, request }) => {
		return {
			env,
		};
	},
});
