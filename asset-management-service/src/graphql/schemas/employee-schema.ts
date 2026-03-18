import { gql } from 'graphql-tag';

export const employeeTypeDefs = gql`
	enum EmployeeStatus {
		ACTIVE
		ON_LEAVE
		TERMINATED
	}

	type Employee {
		id: ID!
		entraId: String!
		employeeCode: String!
		firstName: String!
		lastName: String!
		firstNameEng: String!
		lastNameEng: String!
		email: String!
		imageUrl: String
		hireDate: String!
		terminationDate: String
		status: EmployeeStatus!
		numberOfVacationDays: Int
		github: String
		department: String!
		branch: String!
		level: String!
		isKpi: Boolean!
		isAdmin: Boolean
		isSalaryCompany: Boolean!
		birthDayAndMonth: String
		birthdayPoster: String
	}
	type Query {
		# Get all employees (ideal for the main AMSS table)
		getEmployees: [Employee!]!

		# Get a single employee by internal ID or HR Code
		getEmployeeById(id: ID!): Employee
		getEmployeeByCode(employeeCode: String!): Employee

		# Filtered lists for specific workflows (e.g., Offboarding)
		getEmployeesByStatus(status: EmployeeStatus!): [Employee!]!
	}
	input CreateEmployeeInput {
		entraId: String!
		employeeCode: String!
		firstName: String!
		lastName: String!
		firstNameEng: String!
		lastNameEng: String!
		email: String!
		imageUrl: String
		hireDate: String!
		status: EmployeeStatus!
		department: String!
		branch: String!
		level: String!
		isKpi: Boolean = false
		isSalaryCompany: Boolean = true
		isAdmin: Boolean = false
		github: String
		birthDayAndMonth: String
	}

	input UpdateEmployeeInput {
		firstName: String
		lastName: String
		firstNameEng: String
		lastNameEng: String
		email: String
		imageUrl: String
		terminationDate: String
		status: EmployeeStatus
		numberOfVacationDays: Int
		github: String
		department: String
		branch: String
		level: String
		isKpi: Boolean
		isSalaryCompany: Boolean
		birthdayPoster: String
	}
	input DeleteEmployeeInput {
		terminationDate: String!
	}

	type Mutation {
		createEmployee(input: CreateEmployeeInput!): Response!

		# Updates are partial; only provided fields will change
		updateEmployee(id: ID!, input: UpdateEmployeeInput!): Response!

		# Soft delete or hard removal
		deleteEmployee(id: ID!, input: DeleteEmployeeInput!): Response!
	}
`;
