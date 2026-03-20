import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  department?: Maybe<Department>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  locationId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  departmentId: Scalars['String']['input'];
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

export type Department = {
  __typename?: 'Department';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type DuplicateAssetInput = {
  assetId: Scalars['String']['input'];
  count: Scalars['Int']['input'];
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

export type EmployeeWithAssets = {
  __typename?: 'EmployeeWithAssets';
  assetLength: Scalars['Int']['output'];
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

export type GetEmployeeInfByIdProps = {
  __typename?: 'GetEmployeeInfByIdProps';
  totalAssetCount?: Maybe<Scalars['Int']['output']>;
  totalAssigmentCount?: Maybe<Scalars['Int']['output']>;
  totalCensusTask?: Maybe<Scalars['Int']['output']>;
};

export enum MaintenanceSeverityEnum {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type MaintenanceTicket = {
  __typename?: 'MaintenanceTicket';
  asset?: Maybe<Asset>;
  assetId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  repairCost?: Maybe<Scalars['Float']['output']>;
  reporterId: Scalars['ID']['output'];
  resolvedAt?: Maybe<Scalars['String']['output']>;
  severity?: Maybe<MaintenanceSeverityEnum>;
  status?: Maybe<TicketStatusEnum>;
  updatedAt: Scalars['String']['output'];
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
  duplicateAsset: Response;
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


export type MutationDuplicateAssetArgs = {
  input: DuplicateAssetInput;
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
  getAssetById: Asset;
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
  getDepartments: Array<Department>;
  getEmployeeByClerkID: Employee;
  getEmployeeByCode?: Maybe<Employee>;
  getEmployeeById?: Maybe<Employee>;
  getEmployeeInfById: GetEmployeeInfByIdProps;
  getEmployees: Array<EmployeeWithAssets>;
  getEmployeesByStatus: Array<Employee>;
  getMaintenanceTicketById?: Maybe<MaintenanceTicket>;
  getMaintenanceTickets: Array<MaintenanceTicket>;
  getPendingAssignments: Array<Assignment>;
  getSubCategories: Array<SubCategory>;
  getSubCategoriesWithCategory: Array<GetSubCategoriesProps>;
  getTicketsByAssetId: Array<MaintenanceTicket>;
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


export type QueryGetEmployeeInfByIdArgs = {
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

export type CreateAssetMutationVariables = Exact<{
  input: CreateAssetInput;
}>;


export type CreateAssetMutation = { __typename?: 'Mutation', createAsset: Response };

export type DeleteAssetMutationVariables = Exact<{
  deleteAssetId: Scalars['ID']['input'];
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', deleteAsset: Response };

export type DuplicateAssetMutationVariables = Exact<{
  input: DuplicateAssetInput;
}>;


export type DuplicateAssetMutation = { __typename?: 'Mutation', duplicateAsset: Response };

export type GetAssetByIdQueryVariables = Exact<{
  getAssetByIdId: Scalars['ID']['input'];
}>;


export type GetAssetByIdQuery = { __typename?: 'Query', getAssetById: { __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, qrUrl: string, name: string, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, assets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, qrUrl: string, name: string }> | null } | null, subCategory?: { __typename?: 'SubCategory', id: string, name: string, categoryId?: string | null } | null, department?: { __typename?: 'Department', id: string, name: string } | null } };

export type GetAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetsQuery = { __typename?: 'Query', getAssets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, qrUrl: string, name: string, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, assets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, qrUrl: string }> | null } | null, subCategory?: { __typename?: 'SubCategory', id: string, name: string, categoryId?: string | null } | null, department?: { __typename?: 'Department', id: string, name: string } | null } | null> | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null }> };

export type GetDepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDepartmentsQuery = { __typename?: 'Query', getDepartments: Array<{ __typename?: 'Department', id: string, name: string }> };

export type GetSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubCategoriesQuery = { __typename?: 'Query', getSubCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId?: string | null }> };

export type UpdateAssetMutationVariables = Exact<{
  updateAssetId: Scalars['ID']['input'];
  input: UpdateAssetInput;
}>;


export type UpdateAssetMutation = { __typename?: 'Mutation', updateAsset: Response };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: Response };

export type CreateSubCategoryMutationVariables = Exact<{
  input: CreateSubCategoryInput;
}>;


export type CreateSubCategoryMutation = { __typename?: 'Mutation', createSubCategory: Response };

export type DeleteCategoryByIdsMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteCategoryByIdsMutation = { __typename?: 'Mutation', deleteCategoryByIds: Response };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: Response };

export type DeleteSubCategoryByIdMutationVariables = Exact<{
  deleteSubCategoryByIdId: Scalars['ID']['input'];
}>;


export type DeleteSubCategoryByIdMutation = { __typename?: 'Mutation', deleteSubCategoryById: Response };

export type EditCategoryByIdMutationVariables = Exact<{
  input: EditCategoryByIdInput;
}>;


export type EditCategoryByIdMutation = { __typename?: 'Mutation', editCategoryById: Response };

export type EditSubCategoryByIdMutationVariables = Exact<{
  input: EditSubCategoryInput;
}>;


export type EditSubCategoryByIdMutation = { __typename?: 'Mutation', editSubCategoryById: Response };

export type GetCategoriesWithAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesWithAssetsQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, assets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, category?: { __typename?: 'Category', id: string, name: string, description?: string | null } | null }> | null }> };

export type GetSubCategoriesWithCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubCategoriesWithCategoryQuery = { __typename?: 'Query', getSubCategoriesWithCategory: Array<{ __typename?: 'getSubCategoriesProps', categories?: { __typename?: 'Category', id: string, name: string, description?: string | null, assets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null } | null }> | null } | null, sub_categories: { __typename?: 'SubCategory', id: string, name: string, categoryId?: string | null } }> };

export type CreateCensusEventMutationVariables = Exact<{
  input: CreateCensusEventInput;
}>;


export type CreateCensusEventMutation = { __typename?: 'Mutation', createCensusEvent: Response };

export type GetCensusReportQueryVariables = Exact<{
  censusId: Scalars['ID']['input'];
}>;


export type GetCensusReportQuery = { __typename?: 'Query', getCensusReport: { __typename?: 'CensusReport', totalAssets: number, verifiedCount: number, verifiedPercentage: number, discrepancies: number, conditionChanges: number, actionItems: number } };

export type GetCensusTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCensusTasksQuery = { __typename?: 'Query', getCensusTasks: Array<{ __typename?: 'CensusTask', verifiedAt?: string | null, censusId: string }> };

export type GetCensusEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCensusEventsQuery = { __typename?: 'Query', getCensusEvents: Array<{ __typename?: 'CensusEvent', id: string, name: string, scope: string, scopeFilter?: string | null, startedAt: string, closedAt?: string | null, createdBy: string }> };

export type CreateAssignmentMutationVariables = Exact<{
  input: CreateAssignmentInput;
}>;


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment: Response };

export type GetAssetsForAssetPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetsForAssetPageQuery = { __typename?: 'Query', getAssets?: Array<{ __typename?: 'Asset', assetTag: string, id: string, status: AssetStatusEnum, category?: { __typename?: 'Category', id: string, name: string } | null } | null> | null };

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { __typename?: 'Query', getEmployees: Array<{ __typename?: 'EmployeeWithAssets', id: string, entraId: string, employeeCode: string, firstName: string, lastName: string, firstNameEng: string, lastNameEng: string, email: string, imageUrl?: string | null, hireDate: string, terminationDate?: string | null, status: EmployeeStatus, numberOfVacationDays?: number | null, github?: string | null, department: string, branch: string, level: string, isKpi: boolean, isAdmin?: boolean | null, isSalaryCompany: boolean, birthDayAndMonth?: string | null, birthdayPoster?: string | null, clerkId: string, role: string, assetLength: number }> };

export type UpdateEmployeeMutationVariables = Exact<{
  updateEmployeeId: Scalars['ID']['input'];
  input: UpdateEmployeeInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee: Response };

export type GetAdminMaintenanceTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminMaintenanceTicketsQuery = { __typename?: 'Query', getMaintenanceTickets: Array<{ __typename?: 'MaintenanceTicket', id: string, reporterId: string, description: string, createdAt: string, resolvedAt?: string | null, severity?: MaintenanceSeverityEnum | null, status?: TicketStatusEnum | null, asset?: { __typename?: 'Asset', assetTag: string, name: string, id: string, locationId?: string | null, department?: { __typename?: 'Department', name: string } | null } | null }> };

export type UpdateMaintenanceTicketMutationVariables = Exact<{
  updateMaintenanceTicketId: Scalars['ID']['input'];
  input: UpdateMaintenanceTicketInput;
}>;


export type UpdateMaintenanceTicketMutation = { __typename?: 'Mutation', updateMaintenanceTicket: Response };

export type GetAdminEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminEmployeesQuery = { __typename?: 'Query', getEmployees: Array<{ __typename?: 'EmployeeWithAssets', id: string, entraId: string, firstName: string, lastName: string, terminationDate?: string | null, department: string, branch: string }> };

export type GetEmployeeByClerkIdQueryVariables = Exact<{
  clerkId: Scalars['String']['input'];
}>;


export type GetEmployeeByClerkIdQuery = { __typename?: 'Query', getEmployeeByClerkID: { __typename?: 'Employee', id: string, clerkId: string, firstName: string, lastName: string, email: string, status: EmployeeStatus, hireDate: string, terminationDate?: string | null, role: string } };

export type GetAssetsReturnQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetsReturnQuery = { __typename?: 'Query', getAssets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, assignedTo?: string | null, status: AssetStatusEnum, category?: { __typename?: 'Category', name: string } | null } | null> | null };

export type GetEmployeeByIdQueryVariables = Exact<{
  getEmployeeByIdId: Scalars['ID']['input'];
}>;


export type GetEmployeeByIdQuery = { __typename?: 'Query', getEmployeeById?: { __typename?: 'Employee', id: string, firstName: string, lastName: string, terminationDate?: string | null, department: string, branch: string } | null };

export type GetAssetsByEmployeeIdQueryVariables = Exact<{
  employeeId: Scalars['ID']['input'];
}>;


export type GetAssetsByEmployeeIdQuery = { __typename?: 'Query', getAssetsByEmployeeId?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, qrUrl: string, name: string, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, assets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, imageUrl: string, qrUrl: string, name: string }> | null } | null, subCategory?: { __typename?: 'SubCategory', id: string, name: string, categoryId?: string | null } | null, department?: { __typename?: 'Department', id: string, name: string } | null } | null> | null };

export type GetAssetsAtEmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetsAtEmployeeQuery = { __typename?: 'Query', getAssets?: Array<{ __typename?: 'Asset', assignedTo?: string | null, serialNumber?: string | null, assetTag: string, category?: { __typename?: 'Category', name: string } | null } | null> | null };

export type GetAssignmentsByEmployeeQueryVariables = Exact<{
  employeeId: Scalars['ID']['input'];
}>;


export type GetAssignmentsByEmployeeQuery = { __typename?: 'Query', getAssignmentsByEmployee: Array<{ __typename?: 'Assignment', id: string, employeeId: string, assetId: string, assignedAt: string, conditionAtAssign: string, signatureR2Key?: string | null, asset?: { __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, category?: { __typename?: 'Category', name: string } | null } | null }> };

export type GetActiveCensusIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveCensusIdQuery = { __typename?: 'Query', getCensusEvents: Array<{ __typename?: 'CensusEvent', id: string }> };

export type GetEmployeeDataQueryVariables = Exact<{
  employeeId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
}>;


export type GetEmployeeDataQuery = { __typename?: 'Query', getAssignmentsByEmployee: Array<{ __typename?: 'Assignment', id: string, assignedAt: string, returnedAt?: string | null, asset?: { __typename?: 'Asset', assetTag: string, serialNumber?: string | null, category?: { __typename?: 'Category', name: string, description?: string | null } | null } | null }>, getPendingAssignments: Array<{ __typename?: 'Assignment', id: string, asset?: { __typename?: 'Asset', assetTag: string, serialNumber?: string | null } | null }>, getEmployeeById?: { __typename?: 'Employee', firstName: string, lastName: string } | null };

export type GetPendingAssignmentsQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetPendingAssignmentsQuery = { __typename?: 'Query', getPendingAssignments: Array<{ __typename?: 'Assignment', id: string, signatureR2Key?: string | null, recentSignatureUrl?: string | null, recentSignatureKey?: string | null, asset?: { __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, category?: { __typename?: 'Category', name: string } | null } | null }> };

export type UpdateAssignmentMutationVariables = Exact<{
  updateAssignmentId: Scalars['ID']['input'];
  input: UpdateAssignmentInput;
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: Response };

export type UpdateCensusTaskMutationVariables = Exact<{
  input: UpdateCensusTaskInput;
}>;


export type UpdateCensusTaskMutation = { __typename?: 'Mutation', updateCensusTask: Response };

export type GetEmployeeInfByIdQueryVariables = Exact<{
  getEmployeeInfByIdId: Scalars['ID']['input'];
}>;


export type GetEmployeeInfByIdQuery = { __typename?: 'Query', getEmployeeInfById: { __typename?: 'GetEmployeeInfByIdProps', totalAssetCount?: number | null, totalCensusTask?: number | null, totalAssigmentCount?: number | null } };

export type CreateMaintenanceTicketMutationVariables = Exact<{
  input: CreateMaintenanceTicketInput;
}>;


export type CreateMaintenanceTicketMutation = { __typename?: 'Mutation', createMaintenanceTicket: Response };

export type GetAssetsByEmployeeIdForReportQueryVariables = Exact<{
  employeeId: Scalars['ID']['input'];
}>;


export type GetAssetsByEmployeeIdForReportQuery = { __typename?: 'Query', getAssetsByEmployeeId?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, category?: { __typename?: 'Category', id: string, name: string } | null } | null> | null };

export type GetMaintenanceTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaintenanceTicketsQuery = { __typename?: 'Query', getMaintenanceTickets: Array<{ __typename?: 'MaintenanceTicket', id: string, reporterId: string, description: string, createdAt: string, resolvedAt?: string | null, severity?: MaintenanceSeverityEnum | null, status?: TicketStatusEnum | null, asset?: { __typename?: 'Asset', id: string, name: string, assetTag: string } | null }> };


export const CreateAssetDocument = gql`
    mutation CreateAsset($input: CreateAssetInput!) {
  createAsset(input: $input)
}
    `;
export type CreateAssetMutationFn = Apollo.MutationFunction<CreateAssetMutation, CreateAssetMutationVariables>;
export function useCreateAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssetMutation, CreateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, options);
      }
export type CreateAssetMutationHookResult = ReturnType<typeof useCreateAssetMutation>;
export type CreateAssetMutationResult = Apollo.MutationResult<CreateAssetMutation>;
export type CreateAssetMutationOptions = Apollo.BaseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>;
export const DeleteAssetDocument = gql`
    mutation DeleteAsset($deleteAssetId: ID!) {
  deleteAsset(id: $deleteAssetId)
}
    `;
export type DeleteAssetMutationFn = Apollo.MutationFunction<DeleteAssetMutation, DeleteAssetMutationVariables>;
export function useDeleteAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssetMutation, DeleteAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssetMutation, DeleteAssetMutationVariables>(DeleteAssetDocument, options);
      }
export type DeleteAssetMutationHookResult = ReturnType<typeof useDeleteAssetMutation>;
export type DeleteAssetMutationResult = Apollo.MutationResult<DeleteAssetMutation>;
export type DeleteAssetMutationOptions = Apollo.BaseMutationOptions<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const DuplicateAssetDocument = gql`
    mutation DuplicateAsset($input: DuplicateAssetInput!) {
  duplicateAsset(input: $input)
}
    `;
export type DuplicateAssetMutationFn = Apollo.MutationFunction<DuplicateAssetMutation, DuplicateAssetMutationVariables>;
export function useDuplicateAssetMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateAssetMutation, DuplicateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateAssetMutation, DuplicateAssetMutationVariables>(DuplicateAssetDocument, options);
      }
export type DuplicateAssetMutationHookResult = ReturnType<typeof useDuplicateAssetMutation>;
export type DuplicateAssetMutationResult = Apollo.MutationResult<DuplicateAssetMutation>;
export type DuplicateAssetMutationOptions = Apollo.BaseMutationOptions<DuplicateAssetMutation, DuplicateAssetMutationVariables>;
export const GetAssetByIdDocument = gql`
    query GetAssetById($getAssetByIdId: ID!) {
  getAssetById(id: $getAssetByIdId) {
    id
    assetTag
    category {
      id
      name
      description
      assets {
        id
        assetTag
        serialNumber
        status
        purchaseDate
        purchaseCost
        currentBookValue
        locationId
        assignedTo
        deletedAt
        imageUrl
        qrUrl
        name
      }
    }
    subCategory {
      id
      name
      categoryId
    }
    serialNumber
    status
    purchaseDate
    purchaseCost
    currentBookValue
    locationId
    assignedTo
    deletedAt
    department {
      id
      name
    }
    imageUrl
    qrUrl
    name
  }
}
    `;
export function useGetAssetByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAssetByIdQuery, GetAssetByIdQueryVariables> & ({ variables: GetAssetByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetByIdQuery, GetAssetByIdQueryVariables>(GetAssetByIdDocument, options);
      }
export function useGetAssetByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetByIdQuery, GetAssetByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetByIdQuery, GetAssetByIdQueryVariables>(GetAssetByIdDocument, options);
        }
// @ts-ignore
export function useGetAssetByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetByIdQuery, GetAssetByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetByIdQuery, GetAssetByIdQueryVariables>;
export function useGetAssetByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetByIdQuery, GetAssetByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetByIdQuery | undefined, GetAssetByIdQueryVariables>;
export function useGetAssetByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetByIdQuery, GetAssetByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetByIdQuery, GetAssetByIdQueryVariables>(GetAssetByIdDocument, options);
        }
export type GetAssetByIdQueryHookResult = ReturnType<typeof useGetAssetByIdQuery>;
export type GetAssetByIdLazyQueryHookResult = ReturnType<typeof useGetAssetByIdLazyQuery>;
export type GetAssetByIdSuspenseQueryHookResult = ReturnType<typeof useGetAssetByIdSuspenseQuery>;
export type GetAssetByIdQueryResult = Apollo.QueryResult<GetAssetByIdQuery, GetAssetByIdQueryVariables>;
export const GetAssetsDocument = gql`
    query GetAssets {
  getAssets {
    id
    assetTag
    category {
      id
      name
      description
      assets {
        id
        assetTag
        serialNumber
        status
        purchaseDate
        purchaseCost
        currentBookValue
        locationId
        assignedTo
        deletedAt
        imageUrl
        qrUrl
      }
    }
    subCategory {
      id
      name
      categoryId
    }
    serialNumber
    status
    purchaseDate
    purchaseCost
    currentBookValue
    locationId
    assignedTo
    deletedAt
    department {
      id
      name
    }
    imageUrl
    qrUrl
    name
  }
}
    `;
export function useGetAssetsQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsQuery, GetAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsQuery, GetAssetsQueryVariables>(GetAssetsDocument, options);
      }
export function useGetAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsQuery, GetAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsQuery, GetAssetsQueryVariables>(GetAssetsDocument, options);
        }
// @ts-ignore
export function useGetAssetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetsQuery, GetAssetsQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsQuery, GetAssetsQueryVariables>;
export function useGetAssetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsQuery, GetAssetsQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsQuery | undefined, GetAssetsQueryVariables>;
export function useGetAssetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsQuery, GetAssetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetsQuery, GetAssetsQueryVariables>(GetAssetsDocument, options);
        }
export type GetAssetsQueryHookResult = ReturnType<typeof useGetAssetsQuery>;
export type GetAssetsLazyQueryHookResult = ReturnType<typeof useGetAssetsLazyQuery>;
export type GetAssetsSuspenseQueryHookResult = ReturnType<typeof useGetAssetsSuspenseQuery>;
export type GetAssetsQueryResult = Apollo.QueryResult<GetAssetsQuery, GetAssetsQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    description
  }
}
    `;
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
// @ts-ignore
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetCategoriesQuery | undefined, GetCategoriesQueryVariables>;
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetDepartmentsDocument = gql`
    query GetDepartments {
  getDepartments {
    id
    name
  }
}
    `;
export function useGetDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, options);
      }
export function useGetDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, options);
        }
// @ts-ignore
export function useGetDepartmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>): Apollo.UseSuspenseQueryResult<GetDepartmentsQuery, GetDepartmentsQueryVariables>;
export function useGetDepartmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>): Apollo.UseSuspenseQueryResult<GetDepartmentsQuery | undefined, GetDepartmentsQueryVariables>;
export function useGetDepartmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, options);
        }
export type GetDepartmentsQueryHookResult = ReturnType<typeof useGetDepartmentsQuery>;
export type GetDepartmentsLazyQueryHookResult = ReturnType<typeof useGetDepartmentsLazyQuery>;
export type GetDepartmentsSuspenseQueryHookResult = ReturnType<typeof useGetDepartmentsSuspenseQuery>;
export type GetDepartmentsQueryResult = Apollo.QueryResult<GetDepartmentsQuery, GetDepartmentsQueryVariables>;
export const GetSubCategoriesDocument = gql`
    query GetSubCategories {
  getSubCategories {
    id
    name
    categoryId
  }
}
    `;
export function useGetSubCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>(GetSubCategoriesDocument, options);
      }
export function useGetSubCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>(GetSubCategoriesDocument, options);
        }
// @ts-ignore
export function useGetSubCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>;
export function useGetSubCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubCategoriesQuery | undefined, GetSubCategoriesQueryVariables>;
export function useGetSubCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>(GetSubCategoriesDocument, options);
        }
export type GetSubCategoriesQueryHookResult = ReturnType<typeof useGetSubCategoriesQuery>;
export type GetSubCategoriesLazyQueryHookResult = ReturnType<typeof useGetSubCategoriesLazyQuery>;
export type GetSubCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetSubCategoriesSuspenseQuery>;
export type GetSubCategoriesQueryResult = Apollo.QueryResult<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>;
export const UpdateAssetDocument = gql`
    mutation UpdateAsset($updateAssetId: ID!, $input: UpdateAssetInput!) {
  updateAsset(id: $updateAssetId, input: $input)
}
    `;
export type UpdateAssetMutationFn = Apollo.MutationFunction<UpdateAssetMutation, UpdateAssetMutationVariables>;
export function useUpdateAssetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssetMutation, UpdateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssetMutation, UpdateAssetMutationVariables>(UpdateAssetDocument, options);
      }
export type UpdateAssetMutationHookResult = ReturnType<typeof useUpdateAssetMutation>;
export type UpdateAssetMutationResult = Apollo.MutationResult<UpdateAssetMutation>;
export type UpdateAssetMutationOptions = Apollo.BaseMutationOptions<UpdateAssetMutation, UpdateAssetMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input)
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateSubCategoryDocument = gql`
    mutation CreateSubCategory($input: createSubCategoryInput!) {
  createSubCategory(input: $input)
}
    `;
export type CreateSubCategoryMutationFn = Apollo.MutationFunction<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;
export function useCreateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>(CreateSubCategoryDocument, options);
      }
export type CreateSubCategoryMutationHookResult = ReturnType<typeof useCreateSubCategoryMutation>;
export type CreateSubCategoryMutationResult = Apollo.MutationResult<CreateSubCategoryMutation>;
export type CreateSubCategoryMutationOptions = Apollo.BaseMutationOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;
export const DeleteCategoryByIdsDocument = gql`
    mutation DeleteCategoryByIds($ids: [String!]!) {
  deleteCategoryByIds(ids: $ids)
}
    `;
export type DeleteCategoryByIdsMutationFn = Apollo.MutationFunction<DeleteCategoryByIdsMutation, DeleteCategoryByIdsMutationVariables>;
export function useDeleteCategoryByIdsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryByIdsMutation, DeleteCategoryByIdsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryByIdsMutation, DeleteCategoryByIdsMutationVariables>(DeleteCategoryByIdsDocument, options);
      }
export type DeleteCategoryByIdsMutationHookResult = ReturnType<typeof useDeleteCategoryByIdsMutation>;
export type DeleteCategoryByIdsMutationResult = Apollo.MutationResult<DeleteCategoryByIdsMutation>;
export type DeleteCategoryByIdsMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryByIdsMutation, DeleteCategoryByIdsMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: ID!) {
  deleteCategory(id: $deleteCategoryId)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteSubCategoryByIdDocument = gql`
    mutation DeleteSubCategoryById($deleteSubCategoryByIdId: ID!) {
  deleteSubCategoryById(id: $deleteSubCategoryByIdId)
}
    `;
export type DeleteSubCategoryByIdMutationFn = Apollo.MutationFunction<DeleteSubCategoryByIdMutation, DeleteSubCategoryByIdMutationVariables>;
export function useDeleteSubCategoryByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubCategoryByIdMutation, DeleteSubCategoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubCategoryByIdMutation, DeleteSubCategoryByIdMutationVariables>(DeleteSubCategoryByIdDocument, options);
      }
export type DeleteSubCategoryByIdMutationHookResult = ReturnType<typeof useDeleteSubCategoryByIdMutation>;
export type DeleteSubCategoryByIdMutationResult = Apollo.MutationResult<DeleteSubCategoryByIdMutation>;
export type DeleteSubCategoryByIdMutationOptions = Apollo.BaseMutationOptions<DeleteSubCategoryByIdMutation, DeleteSubCategoryByIdMutationVariables>;
export const EditCategoryByIdDocument = gql`
    mutation EditCategoryById($input: editCategoryByIdInput!) {
  editCategoryById(input: $input)
}
    `;
export type EditCategoryByIdMutationFn = Apollo.MutationFunction<EditCategoryByIdMutation, EditCategoryByIdMutationVariables>;
export function useEditCategoryByIdMutation(baseOptions?: Apollo.MutationHookOptions<EditCategoryByIdMutation, EditCategoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCategoryByIdMutation, EditCategoryByIdMutationVariables>(EditCategoryByIdDocument, options);
      }
export type EditCategoryByIdMutationHookResult = ReturnType<typeof useEditCategoryByIdMutation>;
export type EditCategoryByIdMutationResult = Apollo.MutationResult<EditCategoryByIdMutation>;
export type EditCategoryByIdMutationOptions = Apollo.BaseMutationOptions<EditCategoryByIdMutation, EditCategoryByIdMutationVariables>;
export const EditSubCategoryByIdDocument = gql`
    mutation EditSubCategoryById($input: editSubCategoryInput!) {
  editSubCategoryById(input: $input)
}
    `;
export type EditSubCategoryByIdMutationFn = Apollo.MutationFunction<EditSubCategoryByIdMutation, EditSubCategoryByIdMutationVariables>;
export function useEditSubCategoryByIdMutation(baseOptions?: Apollo.MutationHookOptions<EditSubCategoryByIdMutation, EditSubCategoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSubCategoryByIdMutation, EditSubCategoryByIdMutationVariables>(EditSubCategoryByIdDocument, options);
      }
export type EditSubCategoryByIdMutationHookResult = ReturnType<typeof useEditSubCategoryByIdMutation>;
export type EditSubCategoryByIdMutationResult = Apollo.MutationResult<EditSubCategoryByIdMutation>;
export type EditSubCategoryByIdMutationOptions = Apollo.BaseMutationOptions<EditSubCategoryByIdMutation, EditSubCategoryByIdMutationVariables>;
export const GetCategoriesWithAssetsDocument = gql`
    query GetCategoriesWithAssets {
  getCategories {
    id
    name
    description
    assets {
      id
      assetTag
      category {
        id
        name
        description
      }
      serialNumber
      status
      purchaseDate
      purchaseCost
      currentBookValue
      locationId
      assignedTo
      deletedAt
      imageUrl
    }
  }
}
    `;
export function useGetCategoriesWithAssetsQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>(GetCategoriesWithAssetsDocument, options);
      }
export function useGetCategoriesWithAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>(GetCategoriesWithAssetsDocument, options);
        }
// @ts-ignore
export function useGetCategoriesWithAssetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>): Apollo.UseSuspenseQueryResult<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>;
export function useGetCategoriesWithAssetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>): Apollo.UseSuspenseQueryResult<GetCategoriesWithAssetsQuery | undefined, GetCategoriesWithAssetsQueryVariables>;
export function useGetCategoriesWithAssetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>(GetCategoriesWithAssetsDocument, options);
        }
export type GetCategoriesWithAssetsQueryHookResult = ReturnType<typeof useGetCategoriesWithAssetsQuery>;
export type GetCategoriesWithAssetsLazyQueryHookResult = ReturnType<typeof useGetCategoriesWithAssetsLazyQuery>;
export type GetCategoriesWithAssetsSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesWithAssetsSuspenseQuery>;
export type GetCategoriesWithAssetsQueryResult = Apollo.QueryResult<GetCategoriesWithAssetsQuery, GetCategoriesWithAssetsQueryVariables>;
export const GetSubCategoriesWithCategoryDocument = gql`
    query GetSubCategoriesWithCategory {
  getSubCategoriesWithCategory {
    categories {
      id
      name
      description
      assets {
        id
        assetTag
        category {
          id
          name
          description
        }
        serialNumber
        status
        purchaseDate
        purchaseCost
        currentBookValue
        locationId
        assignedTo
        deletedAt
      }
    }
    sub_categories {
      id
      name
      categoryId
    }
  }
}
    `;
export function useGetSubCategoriesWithCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>(GetSubCategoriesWithCategoryDocument, options);
      }
export function useGetSubCategoriesWithCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>(GetSubCategoriesWithCategoryDocument, options);
        }
// @ts-ignore
export function useGetSubCategoriesWithCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>;
export function useGetSubCategoriesWithCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubCategoriesWithCategoryQuery | undefined, GetSubCategoriesWithCategoryQueryVariables>;
export function useGetSubCategoriesWithCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>(GetSubCategoriesWithCategoryDocument, options);
        }
export type GetSubCategoriesWithCategoryQueryHookResult = ReturnType<typeof useGetSubCategoriesWithCategoryQuery>;
export type GetSubCategoriesWithCategoryLazyQueryHookResult = ReturnType<typeof useGetSubCategoriesWithCategoryLazyQuery>;
export type GetSubCategoriesWithCategorySuspenseQueryHookResult = ReturnType<typeof useGetSubCategoriesWithCategorySuspenseQuery>;
export type GetSubCategoriesWithCategoryQueryResult = Apollo.QueryResult<GetSubCategoriesWithCategoryQuery, GetSubCategoriesWithCategoryQueryVariables>;
export const CreateCensusEventDocument = gql`
    mutation CreateCensusEvent($input: CreateCensusEventInput!) {
  createCensusEvent(input: $input)
}
    `;
export type CreateCensusEventMutationFn = Apollo.MutationFunction<CreateCensusEventMutation, CreateCensusEventMutationVariables>;
export function useCreateCensusEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateCensusEventMutation, CreateCensusEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCensusEventMutation, CreateCensusEventMutationVariables>(CreateCensusEventDocument, options);
      }
export type CreateCensusEventMutationHookResult = ReturnType<typeof useCreateCensusEventMutation>;
export type CreateCensusEventMutationResult = Apollo.MutationResult<CreateCensusEventMutation>;
export type CreateCensusEventMutationOptions = Apollo.BaseMutationOptions<CreateCensusEventMutation, CreateCensusEventMutationVariables>;
export const GetCensusReportDocument = gql`
    query GetCensusReport($censusId: ID!) {
  getCensusReport(censusId: $censusId) {
    totalAssets
    verifiedCount
    verifiedPercentage
    discrepancies
    conditionChanges
    actionItems
  }
}
    `;
export function useGetCensusReportQuery(baseOptions: Apollo.QueryHookOptions<GetCensusReportQuery, GetCensusReportQueryVariables> & ({ variables: GetCensusReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCensusReportQuery, GetCensusReportQueryVariables>(GetCensusReportDocument, options);
      }
export function useGetCensusReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCensusReportQuery, GetCensusReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCensusReportQuery, GetCensusReportQueryVariables>(GetCensusReportDocument, options);
        }
// @ts-ignore
export function useGetCensusReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCensusReportQuery, GetCensusReportQueryVariables>): Apollo.UseSuspenseQueryResult<GetCensusReportQuery, GetCensusReportQueryVariables>;
export function useGetCensusReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCensusReportQuery, GetCensusReportQueryVariables>): Apollo.UseSuspenseQueryResult<GetCensusReportQuery | undefined, GetCensusReportQueryVariables>;
export function useGetCensusReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCensusReportQuery, GetCensusReportQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCensusReportQuery, GetCensusReportQueryVariables>(GetCensusReportDocument, options);
        }
export type GetCensusReportQueryHookResult = ReturnType<typeof useGetCensusReportQuery>;
export type GetCensusReportLazyQueryHookResult = ReturnType<typeof useGetCensusReportLazyQuery>;
export type GetCensusReportSuspenseQueryHookResult = ReturnType<typeof useGetCensusReportSuspenseQuery>;
export type GetCensusReportQueryResult = Apollo.QueryResult<GetCensusReportQuery, GetCensusReportQueryVariables>;
export const GetCensusTasksDocument = gql`
    query GetCensusTasks {
  getCensusTasks {
    verifiedAt
    censusId
  }
}
    `;
export function useGetCensusTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetCensusTasksQuery, GetCensusTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCensusTasksQuery, GetCensusTasksQueryVariables>(GetCensusTasksDocument, options);
      }
export function useGetCensusTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCensusTasksQuery, GetCensusTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCensusTasksQuery, GetCensusTasksQueryVariables>(GetCensusTasksDocument, options);
        }
// @ts-ignore
export function useGetCensusTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCensusTasksQuery, GetCensusTasksQueryVariables>): Apollo.UseSuspenseQueryResult<GetCensusTasksQuery, GetCensusTasksQueryVariables>;
export function useGetCensusTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCensusTasksQuery, GetCensusTasksQueryVariables>): Apollo.UseSuspenseQueryResult<GetCensusTasksQuery | undefined, GetCensusTasksQueryVariables>;
export function useGetCensusTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCensusTasksQuery, GetCensusTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCensusTasksQuery, GetCensusTasksQueryVariables>(GetCensusTasksDocument, options);
        }
export type GetCensusTasksQueryHookResult = ReturnType<typeof useGetCensusTasksQuery>;
export type GetCensusTasksLazyQueryHookResult = ReturnType<typeof useGetCensusTasksLazyQuery>;
export type GetCensusTasksSuspenseQueryHookResult = ReturnType<typeof useGetCensusTasksSuspenseQuery>;
export type GetCensusTasksQueryResult = Apollo.QueryResult<GetCensusTasksQuery, GetCensusTasksQueryVariables>;
export const GetCensusEventsDocument = gql`
    query GetCensusEvents {
  getCensusEvents {
    id
    name
    scope
    scopeFilter
    startedAt
    closedAt
    createdBy
  }
}
    `;
export function useGetCensusEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetCensusEventsQuery, GetCensusEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCensusEventsQuery, GetCensusEventsQueryVariables>(GetCensusEventsDocument, options);
      }
export function useGetCensusEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCensusEventsQuery, GetCensusEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCensusEventsQuery, GetCensusEventsQueryVariables>(GetCensusEventsDocument, options);
        }
// @ts-ignore
export function useGetCensusEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCensusEventsQuery, GetCensusEventsQueryVariables>): Apollo.UseSuspenseQueryResult<GetCensusEventsQuery, GetCensusEventsQueryVariables>;
export function useGetCensusEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCensusEventsQuery, GetCensusEventsQueryVariables>): Apollo.UseSuspenseQueryResult<GetCensusEventsQuery | undefined, GetCensusEventsQueryVariables>;
export function useGetCensusEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCensusEventsQuery, GetCensusEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCensusEventsQuery, GetCensusEventsQueryVariables>(GetCensusEventsDocument, options);
        }
export type GetCensusEventsQueryHookResult = ReturnType<typeof useGetCensusEventsQuery>;
export type GetCensusEventsLazyQueryHookResult = ReturnType<typeof useGetCensusEventsLazyQuery>;
export type GetCensusEventsSuspenseQueryHookResult = ReturnType<typeof useGetCensusEventsSuspenseQuery>;
export type GetCensusEventsQueryResult = Apollo.QueryResult<GetCensusEventsQuery, GetCensusEventsQueryVariables>;
export const CreateAssignmentDocument = gql`
    mutation CreateAssignment($input: CreateAssignmentInput!) {
  createAssignment(input: $input)
}
    `;
export type CreateAssignmentMutationFn = Apollo.MutationFunction<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export function useCreateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssignmentMutation, CreateAssignmentMutationVariables>(CreateAssignmentDocument, options);
      }
export type CreateAssignmentMutationHookResult = ReturnType<typeof useCreateAssignmentMutation>;
export type CreateAssignmentMutationResult = Apollo.MutationResult<CreateAssignmentMutation>;
export type CreateAssignmentMutationOptions = Apollo.BaseMutationOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const GetAssetsForAssetPageDocument = gql`
    query GetAssetsForAssetPage {
  getAssets {
    assetTag
    id
    status
    category {
      id
      name
    }
  }
}
    `;
export function useGetAssetsForAssetPageQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>(GetAssetsForAssetPageDocument, options);
      }
export function useGetAssetsForAssetPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>(GetAssetsForAssetPageDocument, options);
        }
// @ts-ignore
export function useGetAssetsForAssetPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>;
export function useGetAssetsForAssetPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsForAssetPageQuery | undefined, GetAssetsForAssetPageQueryVariables>;
export function useGetAssetsForAssetPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>(GetAssetsForAssetPageDocument, options);
        }
export type GetAssetsForAssetPageQueryHookResult = ReturnType<typeof useGetAssetsForAssetPageQuery>;
export type GetAssetsForAssetPageLazyQueryHookResult = ReturnType<typeof useGetAssetsForAssetPageLazyQuery>;
export type GetAssetsForAssetPageSuspenseQueryHookResult = ReturnType<typeof useGetAssetsForAssetPageSuspenseQuery>;
export type GetAssetsForAssetPageQueryResult = Apollo.QueryResult<GetAssetsForAssetPageQuery, GetAssetsForAssetPageQueryVariables>;
export const GetEmployeesDocument = gql`
    query GetEmployees {
  getEmployees {
    id
    entraId
    employeeCode
    firstName
    lastName
    firstNameEng
    lastNameEng
    email
    imageUrl
    hireDate
    terminationDate
    status
    numberOfVacationDays
    github
    department
    branch
    level
    isKpi
    isAdmin
    isSalaryCompany
    birthDayAndMonth
    birthdayPoster
    clerkId
    role
    assetLength
  }
}
    `;
export function useGetEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
      }
export function useGetEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
// @ts-ignore
export function useGetEmployeesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeesQuery, GetEmployeesQueryVariables>;
export function useGetEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeesQuery | undefined, GetEmployeesQueryVariables>;
export function useGetEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export type GetEmployeesQueryHookResult = ReturnType<typeof useGetEmployeesQuery>;
export type GetEmployeesLazyQueryHookResult = ReturnType<typeof useGetEmployeesLazyQuery>;
export type GetEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetEmployeesSuspenseQuery>;
export type GetEmployeesQueryResult = Apollo.QueryResult<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($updateEmployeeId: ID!, $input: UpdateEmployeeInput!) {
  updateEmployee(id: $updateEmployeeId, input: $input)
}
    `;
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;
export function useUpdateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(UpdateEmployeeDocument, options);
      }
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>;
export type UpdateEmployeeMutationResult = Apollo.MutationResult<UpdateEmployeeMutation>;
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;
export const GetAdminMaintenanceTicketsDocument = gql`
    query GetAdminMaintenanceTickets {
  getMaintenanceTickets {
    id
    reporterId
    description
    createdAt
    resolvedAt
    severity
    status
    asset {
      assetTag
      name
      id
      locationId
      department {
        name
      }
    }
  }
}
    `;
export function useGetAdminMaintenanceTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>(GetAdminMaintenanceTicketsDocument, options);
      }
export function useGetAdminMaintenanceTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>(GetAdminMaintenanceTicketsDocument, options);
        }
// @ts-ignore
export function useGetAdminMaintenanceTicketsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>): Apollo.UseSuspenseQueryResult<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>;
export function useGetAdminMaintenanceTicketsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>): Apollo.UseSuspenseQueryResult<GetAdminMaintenanceTicketsQuery | undefined, GetAdminMaintenanceTicketsQueryVariables>;
export function useGetAdminMaintenanceTicketsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>(GetAdminMaintenanceTicketsDocument, options);
        }
export type GetAdminMaintenanceTicketsQueryHookResult = ReturnType<typeof useGetAdminMaintenanceTicketsQuery>;
export type GetAdminMaintenanceTicketsLazyQueryHookResult = ReturnType<typeof useGetAdminMaintenanceTicketsLazyQuery>;
export type GetAdminMaintenanceTicketsSuspenseQueryHookResult = ReturnType<typeof useGetAdminMaintenanceTicketsSuspenseQuery>;
export type GetAdminMaintenanceTicketsQueryResult = Apollo.QueryResult<GetAdminMaintenanceTicketsQuery, GetAdminMaintenanceTicketsQueryVariables>;
export const UpdateMaintenanceTicketDocument = gql`
    mutation UpdateMaintenanceTicket($updateMaintenanceTicketId: ID!, $input: UpdateMaintenanceTicketInput!) {
  updateMaintenanceTicket(id: $updateMaintenanceTicketId, input: $input)
}
    `;
export type UpdateMaintenanceTicketMutationFn = Apollo.MutationFunction<UpdateMaintenanceTicketMutation, UpdateMaintenanceTicketMutationVariables>;
export function useUpdateMaintenanceTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMaintenanceTicketMutation, UpdateMaintenanceTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMaintenanceTicketMutation, UpdateMaintenanceTicketMutationVariables>(UpdateMaintenanceTicketDocument, options);
      }
export type UpdateMaintenanceTicketMutationHookResult = ReturnType<typeof useUpdateMaintenanceTicketMutation>;
export type UpdateMaintenanceTicketMutationResult = Apollo.MutationResult<UpdateMaintenanceTicketMutation>;
export type UpdateMaintenanceTicketMutationOptions = Apollo.BaseMutationOptions<UpdateMaintenanceTicketMutation, UpdateMaintenanceTicketMutationVariables>;
export const GetAdminEmployeesDocument = gql`
    query GetAdminEmployees {
  getEmployees {
    id
    entraId
    firstName
    lastName
    terminationDate
    department
    branch
  }
}
    `;
export function useGetAdminEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>(GetAdminEmployeesDocument, options);
      }
export function useGetAdminEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>(GetAdminEmployeesDocument, options);
        }
// @ts-ignore
export function useGetAdminEmployeesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>): Apollo.UseSuspenseQueryResult<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>;
export function useGetAdminEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>): Apollo.UseSuspenseQueryResult<GetAdminEmployeesQuery | undefined, GetAdminEmployeesQueryVariables>;
export function useGetAdminEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>(GetAdminEmployeesDocument, options);
        }
export type GetAdminEmployeesQueryHookResult = ReturnType<typeof useGetAdminEmployeesQuery>;
export type GetAdminEmployeesLazyQueryHookResult = ReturnType<typeof useGetAdminEmployeesLazyQuery>;
export type GetAdminEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetAdminEmployeesSuspenseQuery>;
export type GetAdminEmployeesQueryResult = Apollo.QueryResult<GetAdminEmployeesQuery, GetAdminEmployeesQueryVariables>;
export const GetEmployeeByClerkIdDocument = gql`
    query GetEmployeeByClerkID($clerkId: String!) {
  getEmployeeByClerkID(clerkId: $clerkId) {
    id
    clerkId
    firstName
    lastName
    email
    status
    hireDate
    terminationDate
    role
  }
}
    `;
export function useGetEmployeeByClerkIdQuery(baseOptions: Apollo.QueryHookOptions<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables> & ({ variables: GetEmployeeByClerkIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>(GetEmployeeByClerkIdDocument, options);
      }
export function useGetEmployeeByClerkIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>(GetEmployeeByClerkIdDocument, options);
        }
// @ts-ignore
export function useGetEmployeeByClerkIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>;
export function useGetEmployeeByClerkIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeByClerkIdQuery | undefined, GetEmployeeByClerkIdQueryVariables>;
export function useGetEmployeeByClerkIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>(GetEmployeeByClerkIdDocument, options);
        }
export type GetEmployeeByClerkIdQueryHookResult = ReturnType<typeof useGetEmployeeByClerkIdQuery>;
export type GetEmployeeByClerkIdLazyQueryHookResult = ReturnType<typeof useGetEmployeeByClerkIdLazyQuery>;
export type GetEmployeeByClerkIdSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeByClerkIdSuspenseQuery>;
export type GetEmployeeByClerkIdQueryResult = Apollo.QueryResult<GetEmployeeByClerkIdQuery, GetEmployeeByClerkIdQueryVariables>;
export const GetAssetsReturnDocument = gql`
    query GetAssetsReturn {
  getAssets {
    id
    assetTag
    category {
      name
    }
    assignedTo
    status
  }
}
    `;
export function useGetAssetsReturnQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>(GetAssetsReturnDocument, options);
      }
export function useGetAssetsReturnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>(GetAssetsReturnDocument, options);
        }
// @ts-ignore
export function useGetAssetsReturnSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>;
export function useGetAssetsReturnSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsReturnQuery | undefined, GetAssetsReturnQueryVariables>;
export function useGetAssetsReturnSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>(GetAssetsReturnDocument, options);
        }
export type GetAssetsReturnQueryHookResult = ReturnType<typeof useGetAssetsReturnQuery>;
export type GetAssetsReturnLazyQueryHookResult = ReturnType<typeof useGetAssetsReturnLazyQuery>;
export type GetAssetsReturnSuspenseQueryHookResult = ReturnType<typeof useGetAssetsReturnSuspenseQuery>;
export type GetAssetsReturnQueryResult = Apollo.QueryResult<GetAssetsReturnQuery, GetAssetsReturnQueryVariables>;
export const GetEmployeeByIdDocument = gql`
    query GetEmployeeById($getEmployeeByIdId: ID!) {
  getEmployeeById(id: $getEmployeeByIdId) {
    id
    firstName
    lastName
    terminationDate
    department
    branch
  }
}
    `;
export function useGetEmployeeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables> & ({ variables: GetEmployeeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
      }
export function useGetEmployeeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
        }
// @ts-ignore
export function useGetEmployeeByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>;
export function useGetEmployeeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeByIdQuery | undefined, GetEmployeeByIdQueryVariables>;
export function useGetEmployeeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
        }
export type GetEmployeeByIdQueryHookResult = ReturnType<typeof useGetEmployeeByIdQuery>;
export type GetEmployeeByIdLazyQueryHookResult = ReturnType<typeof useGetEmployeeByIdLazyQuery>;
export type GetEmployeeByIdSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeByIdSuspenseQuery>;
export type GetEmployeeByIdQueryResult = Apollo.QueryResult<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>;
export const GetAssetsByEmployeeIdDocument = gql`
    query GetAssetsByEmployeeId($employeeId: ID!) {
  getAssetsByEmployeeId(employeeId: $employeeId) {
    id
    assetTag
    category {
      id
      name
      description
      assets {
        id
        assetTag
        serialNumber
        status
        purchaseDate
        purchaseCost
        currentBookValue
        locationId
        assignedTo
        deletedAt
        imageUrl
        qrUrl
        name
      }
    }
    subCategory {
      id
      name
      categoryId
    }
    serialNumber
    status
    purchaseDate
    purchaseCost
    currentBookValue
    locationId
    assignedTo
    deletedAt
    department {
      id
      name
    }
    imageUrl
    qrUrl
    name
  }
}
    `;
export function useGetAssetsByEmployeeIdQuery(baseOptions: Apollo.QueryHookOptions<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables> & ({ variables: GetAssetsByEmployeeIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>(GetAssetsByEmployeeIdDocument, options);
      }
export function useGetAssetsByEmployeeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>(GetAssetsByEmployeeIdDocument, options);
        }
// @ts-ignore
export function useGetAssetsByEmployeeIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>;
export function useGetAssetsByEmployeeIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsByEmployeeIdQuery | undefined, GetAssetsByEmployeeIdQueryVariables>;
export function useGetAssetsByEmployeeIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>(GetAssetsByEmployeeIdDocument, options);
        }
export type GetAssetsByEmployeeIdQueryHookResult = ReturnType<typeof useGetAssetsByEmployeeIdQuery>;
export type GetAssetsByEmployeeIdLazyQueryHookResult = ReturnType<typeof useGetAssetsByEmployeeIdLazyQuery>;
export type GetAssetsByEmployeeIdSuspenseQueryHookResult = ReturnType<typeof useGetAssetsByEmployeeIdSuspenseQuery>;
export type GetAssetsByEmployeeIdQueryResult = Apollo.QueryResult<GetAssetsByEmployeeIdQuery, GetAssetsByEmployeeIdQueryVariables>;
export const GetAssetsAtEmployeeDocument = gql`
    query GetAssetsAtEmployee {
  getAssets {
    category {
      name
    }
    assignedTo
    serialNumber
    assetTag
  }
}
    `;
export function useGetAssetsAtEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>(GetAssetsAtEmployeeDocument, options);
      }
export function useGetAssetsAtEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>(GetAssetsAtEmployeeDocument, options);
        }
// @ts-ignore
export function useGetAssetsAtEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>;
export function useGetAssetsAtEmployeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsAtEmployeeQuery | undefined, GetAssetsAtEmployeeQueryVariables>;
export function useGetAssetsAtEmployeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>(GetAssetsAtEmployeeDocument, options);
        }
export type GetAssetsAtEmployeeQueryHookResult = ReturnType<typeof useGetAssetsAtEmployeeQuery>;
export type GetAssetsAtEmployeeLazyQueryHookResult = ReturnType<typeof useGetAssetsAtEmployeeLazyQuery>;
export type GetAssetsAtEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetAssetsAtEmployeeSuspenseQuery>;
export type GetAssetsAtEmployeeQueryResult = Apollo.QueryResult<GetAssetsAtEmployeeQuery, GetAssetsAtEmployeeQueryVariables>;
export const GetAssignmentsByEmployeeDocument = gql`
    query GetAssignmentsByEmployee($employeeId: ID!) {
  getAssignmentsByEmployee(employeeId: $employeeId) {
    id
    employeeId
    assetId
    assignedAt
    conditionAtAssign
    signatureR2Key
    asset {
      id
      assetTag
      serialNumber
      category {
        name
      }
    }
  }
}
    `;
export function useGetAssignmentsByEmployeeQuery(baseOptions: Apollo.QueryHookOptions<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables> & ({ variables: GetAssignmentsByEmployeeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>(GetAssignmentsByEmployeeDocument, options);
      }
export function useGetAssignmentsByEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>(GetAssignmentsByEmployeeDocument, options);
        }
// @ts-ignore
export function useGetAssignmentsByEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>;
export function useGetAssignmentsByEmployeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssignmentsByEmployeeQuery | undefined, GetAssignmentsByEmployeeQueryVariables>;
export function useGetAssignmentsByEmployeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>(GetAssignmentsByEmployeeDocument, options);
        }
export type GetAssignmentsByEmployeeQueryHookResult = ReturnType<typeof useGetAssignmentsByEmployeeQuery>;
export type GetAssignmentsByEmployeeLazyQueryHookResult = ReturnType<typeof useGetAssignmentsByEmployeeLazyQuery>;
export type GetAssignmentsByEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetAssignmentsByEmployeeSuspenseQuery>;
export type GetAssignmentsByEmployeeQueryResult = Apollo.QueryResult<GetAssignmentsByEmployeeQuery, GetAssignmentsByEmployeeQueryVariables>;
export const GetActiveCensusIdDocument = gql`
    query GetActiveCensusId {
  getCensusEvents {
    id
  }
}
    `;
export function useGetActiveCensusIdQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>(GetActiveCensusIdDocument, options);
      }
export function useGetActiveCensusIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>(GetActiveCensusIdDocument, options);
        }
// @ts-ignore
export function useGetActiveCensusIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>;
export function useGetActiveCensusIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetActiveCensusIdQuery | undefined, GetActiveCensusIdQueryVariables>;
export function useGetActiveCensusIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>(GetActiveCensusIdDocument, options);
        }
export type GetActiveCensusIdQueryHookResult = ReturnType<typeof useGetActiveCensusIdQuery>;
export type GetActiveCensusIdLazyQueryHookResult = ReturnType<typeof useGetActiveCensusIdLazyQuery>;
export type GetActiveCensusIdSuspenseQueryHookResult = ReturnType<typeof useGetActiveCensusIdSuspenseQuery>;
export type GetActiveCensusIdQueryResult = Apollo.QueryResult<GetActiveCensusIdQuery, GetActiveCensusIdQueryVariables>;
export const GetEmployeeDataDocument = gql`
    query GetEmployeeData($employeeId: ID!, $token: String!) {
  getAssignmentsByEmployee(employeeId: $employeeId) {
    id
    asset {
      assetTag
      serialNumber
      category {
        name
        description
      }
    }
    assignedAt
    returnedAt
  }
  getPendingAssignments(token: $token) {
    id
    asset {
      assetTag
      serialNumber
    }
  }
  getEmployeeById(id: $employeeId) {
    firstName
    lastName
  }
}
    `;
export function useGetEmployeeDataQuery(baseOptions: Apollo.QueryHookOptions<GetEmployeeDataQuery, GetEmployeeDataQueryVariables> & ({ variables: GetEmployeeDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>(GetEmployeeDataDocument, options);
      }
export function useGetEmployeeDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>(GetEmployeeDataDocument, options);
        }
// @ts-ignore
export function useGetEmployeeDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>;
export function useGetEmployeeDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeDataQuery | undefined, GetEmployeeDataQueryVariables>;
export function useGetEmployeeDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>(GetEmployeeDataDocument, options);
        }
export type GetEmployeeDataQueryHookResult = ReturnType<typeof useGetEmployeeDataQuery>;
export type GetEmployeeDataLazyQueryHookResult = ReturnType<typeof useGetEmployeeDataLazyQuery>;
export type GetEmployeeDataSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeDataSuspenseQuery>;
export type GetEmployeeDataQueryResult = Apollo.QueryResult<GetEmployeeDataQuery, GetEmployeeDataQueryVariables>;
export const GetPendingAssignmentsDocument = gql`
    query GetPendingAssignments($token: String!) {
  getPendingAssignments(token: $token) {
    id
    signatureR2Key
    asset {
      id
      assetTag
      serialNumber
      category {
        name
      }
    }
    recentSignatureUrl
    recentSignatureKey
  }
}
    `;
export function useGetPendingAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables> & ({ variables: GetPendingAssignmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>(GetPendingAssignmentsDocument, options);
      }
export function useGetPendingAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>(GetPendingAssignmentsDocument, options);
        }
// @ts-ignore
export function useGetPendingAssignmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>): Apollo.UseSuspenseQueryResult<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>;
export function useGetPendingAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>): Apollo.UseSuspenseQueryResult<GetPendingAssignmentsQuery | undefined, GetPendingAssignmentsQueryVariables>;
export function useGetPendingAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>(GetPendingAssignmentsDocument, options);
        }
export type GetPendingAssignmentsQueryHookResult = ReturnType<typeof useGetPendingAssignmentsQuery>;
export type GetPendingAssignmentsLazyQueryHookResult = ReturnType<typeof useGetPendingAssignmentsLazyQuery>;
export type GetPendingAssignmentsSuspenseQueryHookResult = ReturnType<typeof useGetPendingAssignmentsSuspenseQuery>;
export type GetPendingAssignmentsQueryResult = Apollo.QueryResult<GetPendingAssignmentsQuery, GetPendingAssignmentsQueryVariables>;
export const UpdateAssignmentDocument = gql`
    mutation UpdateAssignment($updateAssignmentId: ID!, $input: UpdateAssignmentInput!) {
  updateAssignment(id: $updateAssignmentId, input: $input)
}
    `;
export type UpdateAssignmentMutationFn = Apollo.MutationFunction<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export function useUpdateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>(UpdateAssignmentDocument, options);
      }
export type UpdateAssignmentMutationHookResult = ReturnType<typeof useUpdateAssignmentMutation>;
export type UpdateAssignmentMutationResult = Apollo.MutationResult<UpdateAssignmentMutation>;
export type UpdateAssignmentMutationOptions = Apollo.BaseMutationOptions<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export const UpdateCensusTaskDocument = gql`
    mutation UpdateCensusTask($input: UpdateCensusTaskInput!) {
  updateCensusTask(input: $input)
}
    `;
export type UpdateCensusTaskMutationFn = Apollo.MutationFunction<UpdateCensusTaskMutation, UpdateCensusTaskMutationVariables>;
export function useUpdateCensusTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCensusTaskMutation, UpdateCensusTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCensusTaskMutation, UpdateCensusTaskMutationVariables>(UpdateCensusTaskDocument, options);
      }
export type UpdateCensusTaskMutationHookResult = ReturnType<typeof useUpdateCensusTaskMutation>;
export type UpdateCensusTaskMutationResult = Apollo.MutationResult<UpdateCensusTaskMutation>;
export type UpdateCensusTaskMutationOptions = Apollo.BaseMutationOptions<UpdateCensusTaskMutation, UpdateCensusTaskMutationVariables>;
export const GetEmployeeInfByIdDocument = gql`
    query GetEmployeeInfById($getEmployeeInfByIdId: ID!) {
  getEmployeeInfById(id: $getEmployeeInfByIdId) {
    totalAssetCount
    totalCensusTask
    totalAssigmentCount
  }
}
    `;
export function useGetEmployeeInfByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables> & ({ variables: GetEmployeeInfByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>(GetEmployeeInfByIdDocument, options);
      }
export function useGetEmployeeInfByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>(GetEmployeeInfByIdDocument, options);
        }
// @ts-ignore
export function useGetEmployeeInfByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>;
export function useGetEmployeeInfByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetEmployeeInfByIdQuery | undefined, GetEmployeeInfByIdQueryVariables>;
export function useGetEmployeeInfByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>(GetEmployeeInfByIdDocument, options);
        }
export type GetEmployeeInfByIdQueryHookResult = ReturnType<typeof useGetEmployeeInfByIdQuery>;
export type GetEmployeeInfByIdLazyQueryHookResult = ReturnType<typeof useGetEmployeeInfByIdLazyQuery>;
export type GetEmployeeInfByIdSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeInfByIdSuspenseQuery>;
export type GetEmployeeInfByIdQueryResult = Apollo.QueryResult<GetEmployeeInfByIdQuery, GetEmployeeInfByIdQueryVariables>;
export const CreateMaintenanceTicketDocument = gql`
    mutation CreateMaintenanceTicket($input: CreateMaintenanceTicketInput!) {
  createMaintenanceTicket(input: $input)
}
    `;
export type CreateMaintenanceTicketMutationFn = Apollo.MutationFunction<CreateMaintenanceTicketMutation, CreateMaintenanceTicketMutationVariables>;
export function useCreateMaintenanceTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateMaintenanceTicketMutation, CreateMaintenanceTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMaintenanceTicketMutation, CreateMaintenanceTicketMutationVariables>(CreateMaintenanceTicketDocument, options);
      }
export type CreateMaintenanceTicketMutationHookResult = ReturnType<typeof useCreateMaintenanceTicketMutation>;
export type CreateMaintenanceTicketMutationResult = Apollo.MutationResult<CreateMaintenanceTicketMutation>;
export type CreateMaintenanceTicketMutationOptions = Apollo.BaseMutationOptions<CreateMaintenanceTicketMutation, CreateMaintenanceTicketMutationVariables>;
export const GetAssetsByEmployeeIdForReportDocument = gql`
    query GetAssetsByEmployeeIdForReport($employeeId: ID!) {
  getAssetsByEmployeeId(employeeId: $employeeId) {
    id
    assetTag
    category {
      id
      name
    }
    serialNumber
  }
}
    `;
export function useGetAssetsByEmployeeIdForReportQuery(baseOptions: Apollo.QueryHookOptions<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables> & ({ variables: GetAssetsByEmployeeIdForReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>(GetAssetsByEmployeeIdForReportDocument, options);
      }
export function useGetAssetsByEmployeeIdForReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>(GetAssetsByEmployeeIdForReportDocument, options);
        }
// @ts-ignore
export function useGetAssetsByEmployeeIdForReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>;
export function useGetAssetsByEmployeeIdForReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssetsByEmployeeIdForReportQuery | undefined, GetAssetsByEmployeeIdForReportQueryVariables>;
export function useGetAssetsByEmployeeIdForReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>(GetAssetsByEmployeeIdForReportDocument, options);
        }
export type GetAssetsByEmployeeIdForReportQueryHookResult = ReturnType<typeof useGetAssetsByEmployeeIdForReportQuery>;
export type GetAssetsByEmployeeIdForReportLazyQueryHookResult = ReturnType<typeof useGetAssetsByEmployeeIdForReportLazyQuery>;
export type GetAssetsByEmployeeIdForReportSuspenseQueryHookResult = ReturnType<typeof useGetAssetsByEmployeeIdForReportSuspenseQuery>;
export type GetAssetsByEmployeeIdForReportQueryResult = Apollo.QueryResult<GetAssetsByEmployeeIdForReportQuery, GetAssetsByEmployeeIdForReportQueryVariables>;
export const GetMaintenanceTicketsDocument = gql`
    query GetMaintenanceTickets {
  getMaintenanceTickets {
    id
    asset {
      id
      name
    }
    reporterId
    description
    createdAt
    resolvedAt
    severity
    asset {
      assetTag
      name
    }
    status
  }
}
    `;
export function useGetMaintenanceTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>(GetMaintenanceTicketsDocument, options);
      }
export function useGetMaintenanceTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>(GetMaintenanceTicketsDocument, options);
        }
// @ts-ignore
export function useGetMaintenanceTicketsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>;
export function useGetMaintenanceTicketsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMaintenanceTicketsQuery | undefined, GetMaintenanceTicketsQueryVariables>;
export function useGetMaintenanceTicketsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>(GetMaintenanceTicketsDocument, options);
        }
export type GetMaintenanceTicketsQueryHookResult = ReturnType<typeof useGetMaintenanceTicketsQuery>;
export type GetMaintenanceTicketsLazyQueryHookResult = ReturnType<typeof useGetMaintenanceTicketsLazyQuery>;
export type GetMaintenanceTicketsSuspenseQueryHookResult = ReturnType<typeof useGetMaintenanceTicketsSuspenseQuery>;
export type GetMaintenanceTicketsQueryResult = Apollo.QueryResult<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>;