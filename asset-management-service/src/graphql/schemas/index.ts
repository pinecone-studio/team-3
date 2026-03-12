import { mergeTypeDefs } from '@graphql-tools/merge';
import { commonTypeDefs } from './common.schema';
import { assetTypeDefs } from './asset.schema';
import { employeeTypeDefs } from './employee.schema';
import { mainTenanceTicketsTypeDefs } from './maintenance-tickets.schema';
import { PurchaseOrdersTypeDefs } from './purchase-orders.schema';

export const typeDefs = mergeTypeDefs([commonTypeDefs, assetTypeDefs,employeeTypeDefs,mainTenanceTicketsTypeDefs,PurchaseOrdersTypeDefs]);
