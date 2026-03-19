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
        category: Category
        subCategory:SubCategory
        serialNumber: String
        status: AssetStatusEnum!
        purchaseDate: String
        purchaseCost: Float
        currentBookValue: Float
        locationId: String
        assignedTo: String
        deletedAt: String
        department:Department
        imageUrl: String!
        qrUrl:String!
        name:String!
    }

	input CreateAssetInput {
    assetTag: String!         
    categoryId: String!       
    subCategoryId: String!    
    serialNumber: String!     
    status: AssetStatusEnum   
    locationId: String!       
    purchaseDate: String!     
    departmentId:String!
    purchaseCost: Float!      
    imageBase64: String!      
}

    input UpdateAssetInput {
        assetTag: String
        categoryId: String
        status: AssetStatusEnum
        serialNumber: String
        locationId: String
        assignedTo: String
        currentBookValue: Float
        purchaseDate: String
        purchaseCost: Float
        imageBase64: String
    }
input DuplicateAssetInput {
    assetId:String!
    count:Int!
}
	type Query {
		getAssets: [Asset]
		getAssetById(id: ID!): Asset!
		getAssetsByEmployeeId(employeeId: ID!): [Asset]
	}

    type Mutation {
        createAsset(input: CreateAssetInput!): Response!
        updateAsset(id: ID!, input: UpdateAssetInput!): Response!
        deleteAsset(id: ID!): Response!
        duplicateAsset(input:DuplicateAssetInput!):Response!
    }
`;