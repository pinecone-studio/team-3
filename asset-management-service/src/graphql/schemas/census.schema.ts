import { gql } from 'graphql-tag';

export const censusTypeDefs = gql`
	type CensusEvent {
		id: ID!
		name: String!
		scope: String!
		scopeFilter: String
		startedAt: String
		closedAt: String
		createdBy: String!
		deletedAt: String
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
		deletedAt: String
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

	input UpdateCensusEventInput {
		id: ID!
		name: String
		scope: String
		scopeFilter: String
		startedAt: String
		closedAt: String
		createdBy: String
	}

	input CreateCensusTaskInput {
		censusId: String!
		assetId: String!
		verifierId: String
		verifiedAt: String
		conditionReported: String
		locationConfirmed: Boolean
		discrepancyFlag: Boolean
	}

	input UpdateCensusTaskInput {
		id: ID!
		verifierId: String
		verifiedAt: String
		conditionReported: String
		locationConfirmed: Boolean
		discrepancyFlag: Boolean
	}

	extend type Query {
		getCensusEvents: [CensusEvent!]!
		getCensusEventById(id: ID!): CensusEvent
		getCensusTasks: [CensusTask!]!
		getCensusTaskById(id: ID!): CensusTask
		getCensusReport(censusId: ID!): CensusReport!
	}

	extend type Mutation {
		createCensusEvent(input: CreateCensusEventInput!): Response!
		updateCensusEvent(input: UpdateCensusEventInput!): Response!
		deleteCensusEvent(id: ID!): Response!

		createCensusTask(input: CreateCensusTaskInput!): Response!
		updateCensusTask(input: UpdateCensusTaskInput!): Response!
	}
`;
