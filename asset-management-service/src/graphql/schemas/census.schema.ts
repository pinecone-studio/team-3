import { gql } from 'graphql-tag';

export const censusTypeDefs = gql`
	type CensusEvent {
		id: ID!
		name: String!
		scope: String!
		scopeFilter: String
		startedAt: String!
		closedAt: String
		createdBy: String!
	}

	type CensusTask {
		id: ID!
		censusId: String!
		assetId: String!
		verifierId: String
		verifiedAt: String
		conditionReported: String
		locationConfirmed: Boolean
		discrepancyFlag: Boolean
		asset: Asset
		verifier: Employee # Renamed from verifierId to avoid collision with the String field
	}

	type CensusReport {
		totalAssets: Int!
		verifiedCount: Int!
		verifiedPercentage: Float!
		discrepancies: Int!
		conditionChanges: Int!
		actionItems: Int!
	}

	input CreateCensusEventInput {
		name: String!
		scope: String!
		scopeFilter: String
		startedAt: String
		closedAt: String
		createdBy: String!
	}

	input UpdateCensusTaskInput {
		id: ID!
		verifierId: String
		verifiedAt: String
		conditionReported: String
		locationConfirmed: Boolean
		discrepancyFlag: Boolean
	}

	type CensusTaskProps {
		id: ID!
		censusId: ID!
		assetId: ID!
		verifierId: ID
		verifiedAt: String
		conditionReported: String
		locationConfirmed: Boolean
		discrepancyFlag: Boolean
asset:Asset
employees:Employee
	}
	extend type Query {
		getCensusEvents: [CensusEvent!]!
		getCensusEventById(id: ID!): CensusEvent
		getCensusTasks: [CensusTask!]!
		getCensusTaskById(id: ID!): CensusTask
		getCensusTaskByAssetId(censusId: ID!, assetId: ID!): CensusTask
		getCensusReport(censusId: ID!): CensusReport!
		# The new query for the employee's pending tasks
		censusTasksByEmployee(employeeId: ID!): [CensusTask]
		getCensusTasksByCensusId(censusId:ID!):[CensusTaskProps!]!
	}

	extend type Mutation {
		createCensusEvent(input: CreateCensusEventInput!): Response!
		updateCensusTask(input: UpdateCensusTaskInput!): Response!
		finalizeCensusEvent(censusId: ID!): Response!
	}
`;
