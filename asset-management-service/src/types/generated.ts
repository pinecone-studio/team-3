import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Asset = {
  __typename?: 'Asset';
  assetTag: Scalars['String']['output'];
  assignedTo?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  currentBookValue?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locationId?: Maybe<Scalars['String']['output']>;
  purchaseCost?: Maybe<Scalars['Float']['output']>;
  purchaseDate?: Maybe<Scalars['String']['output']>;
  serialNumber?: Maybe<Scalars['String']['output']>;
  status: AssetStatusEnum;
};

export enum AssetStatusEnum {
  Assigned = 'ASSIGNED',
  Available = 'AVAILABLE',
  Disposed = 'DISPOSED',
  InRepair = 'IN_REPAIR',
  Lost = 'LOST',
  PendingDisposal = 'PENDING_DISPOSAL'
}

export type CreateAssetInput = {
  assetTag: Scalars['String']['input'];
  category: Scalars['String']['input'];
  locationId?: InputMaybe<Scalars['String']['input']>;
  purchaseCost?: InputMaybe<Scalars['Float']['input']>;
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AssetStatusEnum>;
};

export type Data = {
  __typename?: 'Data';
  category?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum EmployeeStatusEnum {
  Active = 'ACTIVE',
  OnLeave = 'ON_LEAVE',
  Terminated = 'TERMINATED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Response;
  deleteAsset: Response;
  testMutation: Response;
  updateAsset: Response;
};


export type MutationCreateAssetArgs = {
  input: CreateAssetInput;
};


export type MutationDeleteAssetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAssetArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAssetInput;
};

export enum PosStatusEnum {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  getAssetById?: Maybe<Asset>;
  getAssets: Array<Asset>;
  testQuery: Array<Data>;
};


export type QueryGetAssetByIdArgs = {
  id: Scalars['ID']['input'];
};

export enum Response {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export enum Test {
  Haha = 'haha'
}

export type TestQueryResponse = {
  __typename?: 'TestQueryResponse';
  result: Scalars['String']['output'];
};

export enum TicketStatusEnum {
  Cancelled = 'CANCELLED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type UpdateAssetInput = {
  assetTag?: InputMaybe<Scalars['String']['input']>;
  assignedTo?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  currentBookValue?: InputMaybe<Scalars['Float']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  purchaseCost?: InputMaybe<Scalars['Float']['input']>;
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AssetStatusEnum>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Asset: ResolverTypeWrapper<Asset>;
  AssetStatusEnum: AssetStatusEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateAssetInput: CreateAssetInput;
  Data: ResolverTypeWrapper<Data>;
  EmployeeStatusEnum: EmployeeStatusEnum;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PosStatusEnum: PosStatusEnum;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Response: Response;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Test: Test;
  TestQueryResponse: ResolverTypeWrapper<TestQueryResponse>;
  TicketStatusEnum: TicketStatusEnum;
  UpdateAssetInput: UpdateAssetInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: Asset;
  Boolean: Scalars['Boolean']['output'];
  CreateAssetInput: CreateAssetInput;
  Data: Data;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  TestQueryResponse: TestQueryResponse;
  UpdateAssetInput: UpdateAssetInput;
};

export type AssetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  assetTag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assignedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentBookValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchaseCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  purchaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serialNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AssetStatusEnum'], ParentType, ContextType>;
};

export type DataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Data'] = ResolversParentTypes['Data']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAsset?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateAssetArgs, 'input'>>;
  deleteAsset?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteAssetArgs, 'id'>>;
  testMutation?: Resolver<ResolversTypes['Response'], ParentType, ContextType>;
  updateAsset?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateAssetArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAssetById?: Resolver<Maybe<ResolversTypes['Asset']>, ParentType, ContextType, RequireFields<QueryGetAssetByIdArgs, 'id'>>;
  getAssets?: Resolver<Array<ResolversTypes['Asset']>, ParentType, ContextType>;
  testQuery?: Resolver<Array<ResolversTypes['Data']>, ParentType, ContextType>;
};

export type TestQueryResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestQueryResponse'] = ResolversParentTypes['TestQueryResponse']> = {
  result?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Asset?: AssetResolvers<ContextType>;
  Data?: DataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TestQueryResponse?: TestQueryResponseResolvers<ContextType>;
};

