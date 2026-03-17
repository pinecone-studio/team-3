import { gql } from 'graphql-tag';

export const categoryTypeDefs = gql`
	type Category {
		id: ID!
		name: String!
		description: String
		assets: [Asset!]
	}
	input CreateCategoryInput {
     name: String!
     description:String
}
input editCategoryByIdInput {
	id:String!
	name:String
	description:String
}
	type Query {
		getCategories: [Category!]!
		getCategoryById(id: ID!): Category
	}
	type Mutation {
		createCategory(input: CreateCategoryInput!): Response!
		deleteCategory(id: ID!): Response!
		deleteCategoryByIds(ids:[String!]!):Response!
		editCategoryById(input:editCategoryByIdInput!):Response!
	}
`;
