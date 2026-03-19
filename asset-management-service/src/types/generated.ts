import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  category?: Maybe<Category>;
  currentBookValue?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  locationId?: Maybe<Scalars['String']['output']>;
  purchaseCost?: Maybe<Scalars['Float']['output']>;
  purchaseDate?: Maybe<Scalars['String']['output']>;
  qrUrl: Scalars['String']['output'];
  serialNumber?: Maybe<Scalars['String']['output']>;
  status: AssetStatusEnum;
  subCategory?: Maybe<SubCategory>;
};

export enum AssetStatusEnum {
  Assigned = 'ASSIGNED',
  Available = 'AVAILABLE',
  Disposed = 'DISPOSED',
  InRepair = 'IN_REPAIR',
  Lost = 'LOST',
  PendingDisposal = 'PENDING_DISPOSAL'
}

export type Assignment = {
  __typename?: 'Assignment';
  accessoriesJson?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<Asset>;
  assetId: Scalars['String']['output'];
  assignedAt: Scalars['String']['output'];
  conditionAtAssign: Scalars['String']['output'];
  conditionAtReturn?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  recentSignatureKey?: Maybe<Scalars['String']['output']>;
  recentSignatureUrl?: Maybe<Scalars['String']['output']>;
  returnedAt?: Maybe<Scalars['String']['output']>;
  signatureR2Key?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  assets?: Maybe<Array<Asset>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CensusEvent = {
  __typename?: 'CensusEvent';
  closedAt?: Maybe<Scalars['String']['output']>;
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  scope: Scalars['String']['output'];
  scopeFilter?: Maybe<Scalars['String']['output']>;
  startedAt: Scalars['String']['output'];
};

export type CensusReport = {
  __typename?: 'CensusReport';
  actionItems: Scalars['Int']['output'];
  conditionChanges: Scalars['Int']['output'];
  discrepancies: Scalars['Int']['output'];
  totalAssets: Scalars['Int']['output'];
  verifiedCount: Scalars['Int']['output'];
  verifiedPercentage: Scalars['Float']['output'];
};

export type CensusTask = {
  __typename?: 'CensusTask';
  asset?: Maybe<Asset>;
  assetId: Scalars['String']['output'];
  censusId: Scalars['String']['output'];
  conditionReported?: Maybe<Scalars['String']['output']>;
  discrepancyFlag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  locationConfirmed?: Maybe<Scalars['Boolean']['output']>;
  verifiedAt?: Maybe<Scalars['String']['output']>;
  verifierId?: Maybe<Scalars['String']['output']>;
};

export type CreateAssetInput = {
  assetTag: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  imageBase64: Scalars['String']['input'];
  locationId: Scalars['String']['input'];
  purchaseCost: Scalars['Float']['input'];
  purchaseDate: Scalars['String']['input'];
  serialNumber: Scalars['String']['input'];
  status?: InputMaybe<AssetStatusEnum>;
  subCategoryId: Scalars['String']['input'];
};

export type CreateAssignmentInput = {
  accessoriesJson?: InputMaybe<Scalars['String']['input']>;
  assetId: Scalars['String']['input'];
  assignedAt?: InputMaybe<Scalars['String']['input']>;
  conditionAtAssign: Scalars['String']['input'];
  employeeId: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCensusEventInput = {
  closedAt?: InputMaybe<Scalars['String']['input']>;
  createdBy: Scalars['String']['input'];
  name: Scalars['String']['input'];
  scope: Scalars['String']['input'];
  scopeFilter?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEmployeeInput = {
  birthDayAndMonth?: InputMaybe<Scalars['String']['input']>;
  branch: Scalars['String']['input'];
  department: Scalars['String']['input'];
  email: Scalars['String']['input'];
  employeeCode: Scalars['String']['input'];
  entraId: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  firstNameEng: Scalars['String']['input'];
  github?: InputMaybe<Scalars['String']['input']>;
  hireDate: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isKpi?: InputMaybe<Scalars['Boolean']['input']>;
  isSalaryCompany?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  lastNameEng: Scalars['String']['input'];
  level: Scalars['String']['input'];
  status: EmployeeStatus;
};

export type CreateMaintenanceTicketInput = {
  assetId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  repairCost?: InputMaybe<Scalars['Float']['input']>;
  reporterId: Scalars['ID']['input'];
  severity?: InputMaybe<MaintenanceSeverityEnum>;
  status?: InputMaybe<TicketStatusEnum>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteEmployeeInput = {
  terminationDate: Scalars['String']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  birthDayAndMonth?: Maybe<Scalars['String']['output']>;
  birthdayPoster?: Maybe<Scalars['String']['output']>;
  branch: Scalars['String']['output'];
  clerkId: Scalars['String']['output'];
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employeeCode: Scalars['String']['output'];
  entraId: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  firstNameEng: Scalars['String']['output'];
  github?: Maybe<Scalars['String']['output']>;
  hireDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  isKpi: Scalars['Boolean']['output'];
  isSalaryCompany: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  lastNameEng: Scalars['String']['output'];
  level: Scalars['String']['output'];
  numberOfVacationDays?: Maybe<Scalars['Int']['output']>;
  role: Scalars['String']['output'];
  status: EmployeeStatus;
  terminationDate?: Maybe<Scalars['String']['output']>;
};

export enum EmployeeRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum EmployeeStatus {
  Active = 'ACTIVE',
  OnLeave = 'ON_LEAVE',
  Terminated = 'TERMINATED'
}

export enum MaintenanceSeverityEnum {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type MaintenanceTicket = {
  __typename?: 'MaintenanceTicket';
  assetId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  repairCost?: Maybe<Scalars['Float']['output']>;
  reporterId: Scalars['ID']['output'];
  resolvedAt?: Maybe<Scalars['String']['output']>;
  severity?: Maybe<MaintenanceSeverityEnum>;
  status: TicketStatusEnum;
  updatedAt?: Maybe<Scalars['String']['output']>;
  vendorId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Response;
  createAssignment: Response;
  createCategory: Response;
  createCensusEvent: Response;
  createEmployee: Response;
  createMaintenanceTicket: Response;
  createSubCategory: Response;
  deleteAsset: Response;
  deleteAssignment: Response;
  deleteCategory: Response;
  deleteCategoryByIds: Response;
  deleteEmployee: Response;
  deleteMaintenanceTicket: Response;
  deleteSubCategoryById: Response;
  editCategoryById: Response;
  editSubCategoryById: Response;
  finalizeCensusEvent: Response;
  updateAsset: Response;
  updateAssignment: Response;
  updateCensusTask: Response;
  updateEmployee: Response;
  updateMaintenanceTicket: Response;
};


export type MutationCreateAssetArgs = {
  input: CreateAssetInput;
};


export type MutationCreateAssignmentArgs = {
  input: CreateAssignmentInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateCensusEventArgs = {
  input: CreateCensusEventInput;
};


export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type MutationCreateMaintenanceTicketArgs = {
  input: CreateMaintenanceTicketInput;
};


export type MutationCreateSubCategoryArgs = {
  input: CreateSubCategoryInput;
};


export type MutationDeleteAssetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: DeleteEmployeeInput;
};


export type MutationDeleteMaintenanceTicketArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditCategoryByIdArgs = {
  input: EditCategoryByIdInput;
};


export type MutationEditSubCategoryByIdArgs = {
  input: EditSubCategoryInput;
};


export type MutationFinalizeCensusEventArgs = {
  censusId: Scalars['ID']['input'];
};


export type MutationUpdateAssetArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAssetInput;
};


export type MutationUpdateAssignmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAssignmentInput;
};


export type MutationUpdateCensusTaskArgs = {
  input: UpdateCensusTaskInput;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEmployeeInput;
};


export type MutationUpdateMaintenanceTicketArgs = {
  id: Scalars['ID']['input'];
  input: UpdateMaintenanceTicketInput;
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
  getAssets?: Maybe<Array<Maybe<Asset>>>;
  getAssetsByEmployeeId?: Maybe<Array<Maybe<Asset>>>;
  getAssignmentById?: Maybe<Assignment>;
  getAssignments: Array<Assignment>;
  getAssignmentsByAsset: Array<Assignment>;
  getAssignmentsByEmployee: Array<Assignment>;
  getCategories: Array<Category>;
  getCategoryById?: Maybe<Category>;
  getCensusEventById?: Maybe<CensusEvent>;
  getCensusEvents: Array<CensusEvent>;
  getCensusReport: CensusReport;
  getCensusTaskByAssetId?: Maybe<CensusTask>;
  getCensusTaskById?: Maybe<CensusTask>;
  getCensusTasks: Array<CensusTask>;
  getEmployeeByClerkID: Employee;
  getEmployeeByCode?: Maybe<Employee>;
  getEmployeeById?: Maybe<Employee>;
  getEmployees: Array<Employee>;
  getEmployeesByStatus: Array<Employee>;
  getMaintenanceTicketById?: Maybe<MaintenanceTicket>;
  getMaintenanceTickets?: Maybe<Array<Maybe<MaintenanceTicket>>>;
  getPendingAssignments: Array<Assignment>;
  getSubCategories: Array<SubCategory>;
  getSubCategoriesWithCategory: Array<GetSubCategoriesProps>;
  getTicketsByAssetId?: Maybe<Array<Maybe<MaintenanceTicket>>>;
};


export type QueryGetAssetByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssetsByEmployeeIdArgs = {
  employeeId: Scalars['ID']['input'];
};


export type QueryGetAssignmentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssignmentsByAssetArgs = {
  assetId: Scalars['ID']['input'];
};


export type QueryGetAssignmentsByEmployeeArgs = {
  employeeId: Scalars['ID']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCensusEventByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCensusReportArgs = {
  censusId: Scalars['ID']['input'];
};


export type QueryGetCensusTaskByAssetIdArgs = {
  assetId: Scalars['ID']['input'];
  censusId: Scalars['ID']['input'];
};


export type QueryGetCensusTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEmployeeByClerkIdArgs = {
  clerkId: Scalars['String']['input'];
};


export type QueryGetEmployeeByCodeArgs = {
  employeeCode: Scalars['String']['input'];
};


export type QueryGetEmployeeByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEmployeesByStatusArgs = {
  status: EmployeeStatus;
};


export type QueryGetMaintenanceTicketByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPendingAssignmentsArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetTicketsByAssetIdArgs = {
  assetId: Scalars['ID']['input'];
};

export enum Response {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export type SubCategory = {
  __typename?: 'SubCategory';
  categoryId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  categoryId?: InputMaybe<Scalars['String']['input']>;
  currentBookValue?: InputMaybe<Scalars['Float']['input']>;
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  purchaseCost?: InputMaybe<Scalars['Float']['input']>;
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AssetStatusEnum>;
};

export type UpdateAssignmentInput = {
  accessoriesJson?: InputMaybe<Scalars['String']['input']>;
  conditionAtAssign?: InputMaybe<Scalars['String']['input']>;
  conditionAtReturn?: InputMaybe<Scalars['String']['input']>;
  returnedAt?: InputMaybe<Scalars['String']['input']>;
  signatureR2Key?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCensusTaskInput = {
  conditionReported?: InputMaybe<Scalars['String']['input']>;
  discrepancyFlag?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  locationConfirmed?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['String']['input']>;
  verifierId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeInput = {
  birthdayPoster?: InputMaybe<Scalars['String']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstNameEng?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isKpi?: InputMaybe<Scalars['Boolean']['input']>;
  isSalaryCompany?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lastNameEng?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  numberOfVacationDays?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EmployeeStatus>;
  terminationDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMaintenanceTicketInput = {
  assetId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  repairCost?: InputMaybe<Scalars['Float']['input']>;
  reporterId?: InputMaybe<Scalars['ID']['input']>;
  resolvedAt?: InputMaybe<Scalars['String']['input']>;
  severity?: InputMaybe<MaintenanceSeverityEnum>;
  status?: InputMaybe<TicketStatusEnum>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSubCategoryInput = {
  categoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type EditCategoryByIdInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EditSubCategoryInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type GetSubCategoriesProps = {
  __typename?: 'getSubCategoriesProps';
  categories?: Maybe<Category>;
  sub_categories: SubCategory;
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
  Assignment: ResolverTypeWrapper<Assignment>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CensusEvent: ResolverTypeWrapper<CensusEvent>;
  CensusReport: ResolverTypeWrapper<CensusReport>;
  CensusTask: ResolverTypeWrapper<CensusTask>;
  CreateAssetInput: CreateAssetInput;
  CreateAssignmentInput: CreateAssignmentInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateCensusEventInput: CreateCensusEventInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateMaintenanceTicketInput: CreateMaintenanceTicketInput;
  DeleteEmployeeInput: DeleteEmployeeInput;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeRole: EmployeeRole;
  EmployeeStatus: EmployeeStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MaintenanceSeverityEnum: MaintenanceSeverityEnum;
  MaintenanceTicket: ResolverTypeWrapper<MaintenanceTicket>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PosStatusEnum: PosStatusEnum;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Response: Response;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubCategory: ResolverTypeWrapper<SubCategory>;
  TicketStatusEnum: TicketStatusEnum;
  UpdateAssetInput: UpdateAssetInput;
  UpdateAssignmentInput: UpdateAssignmentInput;
  UpdateCensusTaskInput: UpdateCensusTaskInput;
  UpdateEmployeeInput: UpdateEmployeeInput;
  UpdateMaintenanceTicketInput: UpdateMaintenanceTicketInput;
  createSubCategoryInput: CreateSubCategoryInput;
  editCategoryByIdInput: EditCategoryByIdInput;
  editSubCategoryInput: EditSubCategoryInput;
  getSubCategoriesProps: ResolverTypeWrapper<GetSubCategoriesProps>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Asset: Asset;
  Assignment: Assignment;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CensusEvent: CensusEvent;
  CensusReport: CensusReport;
  CensusTask: CensusTask;
  CreateAssetInput: CreateAssetInput;
  CreateAssignmentInput: CreateAssignmentInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateCensusEventInput: CreateCensusEventInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateMaintenanceTicketInput: CreateMaintenanceTicketInput;
  DeleteEmployeeInput: DeleteEmployeeInput;
  Employee: Employee;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MaintenanceTicket: MaintenanceTicket;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  SubCategory: SubCategory;
  UpdateAssetInput: UpdateAssetInput;
  UpdateAssignmentInput: UpdateAssignmentInput;
  UpdateCensusTaskInput: UpdateCensusTaskInput;
  UpdateEmployeeInput: UpdateEmployeeInput;
  UpdateMaintenanceTicketInput: UpdateMaintenanceTicketInput;
  createSubCategoryInput: CreateSubCategoryInput;
  editCategoryByIdInput: EditCategoryByIdInput;
  editSubCategoryInput: EditSubCategoryInput;
  getSubCategoriesProps: GetSubCategoriesProps;
};

export type AssetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  assetTag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assignedTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  currentBookValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchaseCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  purchaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qrUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serialNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AssetStatusEnum'], ParentType, ContextType>;
  subCategory?: Resolver<Maybe<ResolversTypes['SubCategory']>, ParentType, ContextType>;
};

export type AssignmentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Assignment'] = ResolversParentTypes['Assignment']> = {
  accessoriesJson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset?: Resolver<Maybe<ResolversTypes['Asset']>, ParentType, ContextType>;
  assetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assignedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conditionAtAssign?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conditionAtReturn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recentSignatureKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recentSignatureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  returnedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signatureR2Key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  assets?: Resolver<Maybe<Array<ResolversTypes['Asset']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CensusEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CensusEvent'] = ResolversParentTypes['CensusEvent']> = {
  closedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scopeFilter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CensusReportResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CensusReport'] = ResolversParentTypes['CensusReport']> = {
  actionItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  conditionChanges?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  discrepancies?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAssets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  verifiedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  verifiedPercentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type CensusTaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CensusTask'] = ResolversParentTypes['CensusTask']> = {
  asset?: Resolver<Maybe<ResolversTypes['Asset']>, ParentType, ContextType>;
  assetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  censusId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conditionReported?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discrepancyFlag?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locationConfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  verifiedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verifierId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type EmployeeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  birthDayAndMonth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdayPoster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clerkId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employeeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entraId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstNameEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hireDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isKpi?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSalaryCompany?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastNameEng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numberOfVacationDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EmployeeStatus'], ParentType, ContextType>;
  terminationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MaintenanceTicketResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaintenanceTicket'] = ResolversParentTypes['MaintenanceTicket']> = {
  assetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  repairCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reporterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  resolvedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  severity?: Resolver<Maybe<ResolversTypes['MaintenanceSeverityEnum']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TicketStatusEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vendorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAsset?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateAssetArgs, 'input'>>;
  createAssignment?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateAssignmentArgs, 'input'>>;
  createCategory?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  createCensusEvent?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateCensusEventArgs, 'input'>>;
  createEmployee?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateEmployeeArgs, 'input'>>;
  createMaintenanceTicket?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateMaintenanceTicketArgs, 'input'>>;
  createSubCategory?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateSubCategoryArgs, 'input'>>;
  deleteAsset?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteAssetArgs, 'id'>>;
  deleteAssignment?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteAssignmentArgs, 'id'>>;
  deleteCategory?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteCategoryByIds?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteCategoryByIdsArgs, 'ids'>>;
  deleteEmployee?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteEmployeeArgs, 'id' | 'input'>>;
  deleteMaintenanceTicket?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteMaintenanceTicketArgs, 'id'>>;
  deleteSubCategoryById?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteSubCategoryByIdArgs, 'id'>>;
  editCategoryById?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationEditCategoryByIdArgs, 'input'>>;
  editSubCategoryById?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationEditSubCategoryByIdArgs, 'input'>>;
  finalizeCensusEvent?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationFinalizeCensusEventArgs, 'censusId'>>;
  updateAsset?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateAssetArgs, 'id' | 'input'>>;
  updateAssignment?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateAssignmentArgs, 'id' | 'input'>>;
  updateCensusTask?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateCensusTaskArgs, 'input'>>;
  updateEmployee?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateEmployeeArgs, 'id' | 'input'>>;
  updateMaintenanceTicket?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateMaintenanceTicketArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAssetById?: Resolver<Maybe<ResolversTypes['Asset']>, ParentType, ContextType, RequireFields<QueryGetAssetByIdArgs, 'id'>>;
  getAssets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  getAssetsByEmployeeId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType, RequireFields<QueryGetAssetsByEmployeeIdArgs, 'employeeId'>>;
  getAssignmentById?: Resolver<Maybe<ResolversTypes['Assignment']>, ParentType, ContextType, RequireFields<QueryGetAssignmentByIdArgs, 'id'>>;
  getAssignments?: Resolver<Array<ResolversTypes['Assignment']>, ParentType, ContextType>;
  getAssignmentsByAsset?: Resolver<Array<ResolversTypes['Assignment']>, ParentType, ContextType, RequireFields<QueryGetAssignmentsByAssetArgs, 'assetId'>>;
  getAssignmentsByEmployee?: Resolver<Array<ResolversTypes['Assignment']>, ParentType, ContextType, RequireFields<QueryGetAssignmentsByEmployeeArgs, 'employeeId'>>;
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  getCategoryById?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoryByIdArgs, 'id'>>;
  getCensusEventById?: Resolver<Maybe<ResolversTypes['CensusEvent']>, ParentType, ContextType, RequireFields<QueryGetCensusEventByIdArgs, 'id'>>;
  getCensusEvents?: Resolver<Array<ResolversTypes['CensusEvent']>, ParentType, ContextType>;
  getCensusReport?: Resolver<ResolversTypes['CensusReport'], ParentType, ContextType, RequireFields<QueryGetCensusReportArgs, 'censusId'>>;
  getCensusTaskByAssetId?: Resolver<Maybe<ResolversTypes['CensusTask']>, ParentType, ContextType, RequireFields<QueryGetCensusTaskByAssetIdArgs, 'assetId' | 'censusId'>>;
  getCensusTaskById?: Resolver<Maybe<ResolversTypes['CensusTask']>, ParentType, ContextType, RequireFields<QueryGetCensusTaskByIdArgs, 'id'>>;
  getCensusTasks?: Resolver<Array<ResolversTypes['CensusTask']>, ParentType, ContextType>;
  getEmployeeByClerkID?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<QueryGetEmployeeByClerkIdArgs, 'clerkId'>>;
  getEmployeeByCode?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryGetEmployeeByCodeArgs, 'employeeCode'>>;
  getEmployeeById?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryGetEmployeeByIdArgs, 'id'>>;
  getEmployees?: Resolver<Array<ResolversTypes['Employee']>, ParentType, ContextType>;
  getEmployeesByStatus?: Resolver<Array<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryGetEmployeesByStatusArgs, 'status'>>;
  getMaintenanceTicketById?: Resolver<Maybe<ResolversTypes['MaintenanceTicket']>, ParentType, ContextType, RequireFields<QueryGetMaintenanceTicketByIdArgs, 'id'>>;
  getMaintenanceTickets?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaintenanceTicket']>>>, ParentType, ContextType>;
  getPendingAssignments?: Resolver<Array<ResolversTypes['Assignment']>, ParentType, ContextType, RequireFields<QueryGetPendingAssignmentsArgs, 'token'>>;
  getSubCategories?: Resolver<Array<ResolversTypes['SubCategory']>, ParentType, ContextType>;
  getSubCategoriesWithCategory?: Resolver<Array<ResolversTypes['getSubCategoriesProps']>, ParentType, ContextType>;
  getTicketsByAssetId?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaintenanceTicket']>>>, ParentType, ContextType, RequireFields<QueryGetTicketsByAssetIdArgs, 'assetId'>>;
};

export type SubCategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubCategory'] = ResolversParentTypes['SubCategory']> = {
  categoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type GetSubCategoriesPropsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['getSubCategoriesProps'] = ResolversParentTypes['getSubCategoriesProps']> = {
  categories?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  sub_categories?: Resolver<ResolversTypes['SubCategory'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Asset?: AssetResolvers<ContextType>;
  Assignment?: AssignmentResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CensusEvent?: CensusEventResolvers<ContextType>;
  CensusReport?: CensusReportResolvers<ContextType>;
  CensusTask?: CensusTaskResolvers<ContextType>;
  Employee?: EmployeeResolvers<ContextType>;
  MaintenanceTicket?: MaintenanceTicketResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SubCategory?: SubCategoryResolvers<ContextType>;
  getSubCategoriesProps?: GetSubCategoriesPropsResolvers<ContextType>;
};

