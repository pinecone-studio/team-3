import { gql } from 'graphql-tag';

export const employeeTypeDefs = gql`
	enum EmployeeStatusEnum {
		ACTIVE
		TERMINATED
		ON_LEAVE
	}
`;
