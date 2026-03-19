import { gql } from 'graphql-tag';

export const maintenanceTicketTypeDefs = gql`
	# The values here match your TypeScript enum strings: 'CANCELLED', 'OPEN', etc.
	enum TicketStatusEnum {
		CANCELLED
		IN_PROGRESS
		OPEN
		RESOLVED
	}

	enum MaintenanceSeverityEnum {
		LOW
		MEDIUM
		HIGH
		CRITICAL
	}

	type MaintenanceTicket {
		id: ID!
		assetId: ID!
		reporterId: ID!
		description: String!
		severity: MaintenanceSeverityEnum
		status: TicketStatusEnum!
		vendorId: String
		repairCost: Float
		resolvedAt: String
		createdAt: String
		updatedAt: String
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
		getMaintenanceTickets: [MaintenanceTicket]
		getMaintenanceTicketById(id: ID!): MaintenanceTicket
		getTicketsByAssetId(assetId: ID!): [MaintenanceTicket]
	}

	extend type Mutation {
		createMaintenanceTicket(input: CreateMaintenanceTicketInput!): Response!
		updateMaintenanceTicket(id: ID!, input: UpdateMaintenanceTicketInput!): Response!
		deleteMaintenanceTicket(id: ID!): Response!
	}
`;
