import { gql } from 'graphql-tag';

export const mainTenanceTicketsTypeDefs = gql`
	enum TicketStatusEnum {
		OPEN
		IN_PROGRESS
		RESOLVED
		CANCELLED
	}
`;
