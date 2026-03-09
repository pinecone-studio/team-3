

import { mergeTypeDefs } from '@graphql-tools/merge';
import { commonTypeDefs } from './common.schema';
import { testTypeDefs } from './test.schema';



export const typeDefs = mergeTypeDefs([
    commonTypeDefs,
    testTypeDefs
]);