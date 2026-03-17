import { gql } from 'graphql-tag';

export const assignmentTypeDefs = gql`
	type Assignment {
		id: ID!
		assetId: String!
		employeeId: String!
		assignedAt: String!
		returnedAt: String
		conditionAtAssign: String!
		conditionAtReturn: String
		signatureR2Key: String
		# accessoriesJson is stored as a stringified JSON object
		accessoriesJson: String
		asset: Asset
		recentSignatureUrl: String # New virtual field
		recentSignatureKey: String
	}

	type Query {
		# Get all assignment records (history)
		getAssignments: [Assignment!]!

		# Find specific assignment by ID
		getAssignmentById(id: ID!): Assignment

		# Get the history of a specific asset
		getAssignmentsByAsset(assetId: ID!): [Assignment!]!

		getPendingAssignments(token: String!): [Assignment!]!
		# Get all assets currently or previously held by an employee
		getAssignmentsByEmployee(employeeId: ID!): [Assignment!]!
	}

	input CreateAssignmentInput {
		assetId: String!
		employeeId: String!
		assignedAt: String # Defaults to 'now' in resolver if not provided
		conditionAtAssign: String!
		accessoriesJson: String
	}

	input UpdateAssignmentInput {
		# Used for partial updates like adding the signature later
		returnedAt: String
		conditionAtAssign: String
		conditionAtReturn: String
		signatureR2Key: String
		accessoriesJson: String
	}

	type Mutation {
		# Logic to link asset to employee
		createAssignment(input: CreateAssignmentInput!): Response!

		# Update assignment details (e.g., adding signature or return info)
		updateAssignment(id: ID!, input: UpdateAssignmentInput!): Response!

		# Remove an assignment record (Hard delete)
		deleteAssignment(id: ID!): Response!
	}
`;
