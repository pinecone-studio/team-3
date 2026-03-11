import { mergeTypeDefs } from '@graphql-tools/merge';
import { commonTypeDefs } from './common.schema';
import { assetTypeDefs } from './asset.schema';

export const typeDefs = mergeTypeDefs([commonTypeDefs, assetTypeDefs]);
