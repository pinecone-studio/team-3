import { gql } from 'graphql-tag';

export const assetTypeDefs = gql`
	enum AssetStatusEnum {
		AVAILABLE
		ASSIGNED
		IN_REPAIR
		PENDING_DISPOSAL
		DISPOSED
		LOST
	}

	type Asset {
		id: ID!
		assetTag: String!
		category: String!
		serialNumber: String
		status: AssetStatusEnum!
		purchaseDate: String
		purchaseCost: Float
		currentBookValue: Float
		locationId: String
		assignedTo: String
		deletedAt: String
	}

	input CreateAssetInput {
		assetTag: String!
		category: String!
		serialNumber: String
		status: AssetStatusEnum
		locationId: String
		purchaseDate: String
		purchaseCost: Float
	}

	input UpdateAssetInput {
		assetTag: String
		category: String
		status: AssetStatusEnum
		serialNumber: String
		locationId: String
		assignedTo: String
		currentBookValue: Float
		purchaseDate: String
		purchaseCost: Float
	}

	type Query {
		getAssets: [Asset!]!
		getAssetById(id: ID!): Asset
	}

	type Mutation {
		createAsset(input: CreateAssetInput!): Response!
		updateAsset(id: ID!, input: UpdateAssetInput!): Response!
		deleteAsset(id: ID!): Response!
	}
`;
