import { gql } from 'graphql-tag';

export const assetTypeDefs = gql`
	type Asset {
		id: ID!
		assetTag: String!
		category: String!
		serialNumber: String
		status: String!
		purchaseDate: String
		purchaseCost: Float
		currentBookValue: Float
		locationId: String
		assignedTo: String
		createdAt: String
		updatedAt: String
		deletedAt: String
	}

	# Input for Mutations
	input CreateAssetInput {
		assetTag: String!
		category: String!
		serialNumber: String
		status: String
		locationId: String
		purchaseDate: String
		purchaseCost: Float
	}

	input UpdateAssetInput {
		assetTag: String
		category: String
		status: String
		serialNumber: String
		locationId: String
		assignedTo: String
		currentBookValue: Float
		purchaseDate: String
		purchaseCost: Float
	}

	type Query {
		assets: [Asset!]!
		asset(id: ID!): Asset
	}

	type Mutation {
		createAsset(input: CreateAssetInput!): Asset!
		updateAsset(id: ID!, input: UpdateAssetInput!): Asset!
		deleteAsset(id: ID!): Asset!
	}
`;
