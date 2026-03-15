import { mergeTypeDefs } from '@graphql-tools/merge';
import { commonTypeDefs } from './common.schema';
import { mainTenanceTicketsTypeDefs } from './maintenance-tickets.schema';
import { PurchaseOrdersTypeDefs } from './purchase-orders.schema';
import { assetTypeDefs } from './asset-schema';
import { employeeTypeDefs } from './employee-schema';
import { assignmentTypeDefs } from './assignment-schema';
import { censusTypeDefs } from './census.schema';
import { categoryTypeDefs } from './category-schema';

export const typeDefs = mergeTypeDefs([
	commonTypeDefs,
	assetTypeDefs,
	employeeTypeDefs,
	assignmentTypeDefs,
	mainTenanceTicketsTypeDefs,
	PurchaseOrdersTypeDefs,
	censusTypeDefs,
	categoryTypeDefs,
]);
