import { gql } from 'graphql-tag';

export const assetTypeDefs = gql`
	type Asset {
		id: ID!
		asset_tag: String!
		category: String!
		serial_number: String
		status: String!
		purchase_date: String
		purchase_cost: Float
		current_book_value: Float
		location_id: String
		assigned_to: String
		createdAt: String
		updatedAt: String
		deletedAt: String
	}

	# Use Inputs for Mutations to keep arguments organized
	input CreateAssetInput {
		asset_tag: String!
		category: String!
		serial_number: String
		status: String
		location_id: String
		purchase_date: String
		purchase_cost: Float
	}

	input UpdateAssetInput {
		category: String
		status: String
		serial_number: String
		location_id: String
		assigned_to: String
		current_book_value: Float
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
