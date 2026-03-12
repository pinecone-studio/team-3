import { gql } from 'graphql-tag';
export const PurchaseOrdersTypeDefs = gql`
	enum PosStatusEnum {
        PENDING,
        APPROVED,
        DELIVERED,
        CANCELLED
	}
`;