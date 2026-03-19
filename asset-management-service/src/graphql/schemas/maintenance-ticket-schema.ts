import { gql } from 'graphql-tag';

export const maintenanceTicketTypeDefs = gql`
	# Ensure these match the values in your 'TicketStatusEnum' TS enum
	enum TicketStatusEnum {
		CANCELLED
		IN_PROGRESS
		OPEN
		RESOLVED
	}

	# Added to match the 'severity' text field in your Drizzle schema
	enum MaintenanceSeverityEnum {
		LOW
		MEDIUM
		HIGH
		CRITICAL
	}

	type MaintenanceTicket {
		id: ID!
		assetId: ID! # Changed to match DB column name
		asset: Asset # For relational joining in resolvers
		reporterId: ID!
		description: String!
		severity: MaintenanceSeverityEnum
		status: TicketStatusEnum
		vendorId: String
		repairCost: Float # Matches 'real' in Drizzle
		resolvedAt: String # Timestamps often passed as ISO strings or Ints
		createdAt: String! # Now marked as non-nullable per DB schema
		updatedAt: String! # Now marked as non-nullable per DB schema
	}

	input CreateMaintenanceTicketInput {
		assetId: ID!
		reporterId: ID!
		description: String!
		severity: MaintenanceSeverityEnum
		status: TicketStatusEnum
		vendorId: String
		repairCost: Float
	}

	input UpdateMaintenanceTicketInput {
		assetId: ID
		reporterId: ID
		description: String
		severity: MaintenanceSeverityEnum
		status: TicketStatusEnum
		vendorId: String
		repairCost: Float
		resolvedAt: String
	}

	extend type Query {
		getMaintenanceTickets: [MaintenanceTicket!]!
		getMaintenanceTicketById(id: ID!): MaintenanceTicket
		getTicketsByAssetId(assetId: ID!): [MaintenanceTicket!]!
	}

	extend type Mutation {
		createMaintenanceTicket(input: CreateMaintenanceTicketInput!): Response!
		updateMaintenanceTicket(id: ID!, input: UpdateMaintenanceTicketInput!): Response!
		deleteMaintenanceTicket(id: ID!): Response!
	}
`;
