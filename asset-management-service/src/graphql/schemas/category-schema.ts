import { gql } from 'graphql-tag';

export const categoryTypeDefs = gql`
	type Category {
		id: ID!
		name: String!
		picture: String
		assets: [Asset!]
	}
	input CreateCategoryInput {
		name: String!
		picture: String
	}
	type Query {
		getCategories: [Category!]!
		getCategoryById(id: ID!): Category
	}
	type Mutation {
		createCategory(input: CreateCategoryInput!): Response!
		deleteCategory(id: ID!): Response!
	}
`;
