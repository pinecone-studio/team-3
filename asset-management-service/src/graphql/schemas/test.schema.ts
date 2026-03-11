import gql from 'graphql-tag';

export const testTypeDefs = gql`
	enum Test {
		haha
	}
	type Data {
		id: String!
		name: String!
		category: String
	}
	type TestQueryResponse {
		result: String!
	}

	type Mutation {
		testMutation: Response!
	}
	type Query {
		testQuery: [Data!]!
	}
`;
