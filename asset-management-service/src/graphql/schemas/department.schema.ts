import { gql } from 'graphql-tag';

export const departmentTypeDefs = gql`
type  Department {
id:ID!
name:String!
}

	type Query {
    getDepartments:[Department!]!		
	}
	
`;
