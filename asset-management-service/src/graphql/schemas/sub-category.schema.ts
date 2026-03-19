import { gql } from 'graphql-tag';

export const subCategoryTypeDefs = gql`
type SubCategory {
id:String!
name:String!
categoryId:String
}
input createSubCategoryInput {
name:String!
categoryId:String!
}
input editSubCategoryInput {
	id:String!
	name:String!
}
type getSubCategoriesProps {
	categories:Category
	sub_categories:SubCategory!
}
	type Query {
		getSubCategoriesWithCategory:[getSubCategoriesProps!]!
		getSubCategories:[SubCategory!]!
	}
	type Mutation {
		createSubCategory(input:createSubCategoryInput!):Response!
		editSubCategoryById(input:editSubCategoryInput!):Response!
		deleteSubCategoryById(id:ID!):Response!
	}
`;
