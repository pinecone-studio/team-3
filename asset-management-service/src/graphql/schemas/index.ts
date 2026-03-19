import { mergeTypeDefs } from '@graphql-tools/merge';
import { commonTypeDefs } from './common.schema';
import { PurchaseOrdersTypeDefs } from './purchase-orders.schema';

import { employeeTypeDefs } from './employee-schema';
import { assignmentTypeDefs } from './assignment-schema';
import { censusTypeDefs } from './census.schema';
import { categoryTypeDefs } from './category-schema';
import { maintenanceTicketTypeDefs } from './maintenance-ticket-schema';
import { subCategoryTypeDefs } from './sub-category.schema';
import { departmentTypeDefs } from './department.schema';
import { assetTypeDefs } from './asset-schema';

export const typeDefs = mergeTypeDefs([
	commonTypeDefs,
	assetTypeDefs,
	employeeTypeDefs,
	assignmentTypeDefs,
	PurchaseOrdersTypeDefs,
	censusTypeDefs,
	categoryTypeDefs,
	maintenanceTicketTypeDefs,
	subCategoryTypeDefs,
	departmentTypeDefs
]);
