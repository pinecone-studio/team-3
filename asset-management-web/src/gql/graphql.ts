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
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
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
  categoryId?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  purchaseCost?: InputMaybe<Scalars['Float']['input']>;
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AssetStatusEnum>;
};

export type CreateAssignmentInput = {
  accessoriesJson?: InputMaybe<Scalars['String']['input']>;
  assetId: Scalars['String']['input'];
  assignedAt?: InputMaybe<Scalars['String']['input']>;
  conditionAtAssign: Scalars['String']['input'];
  employeeId: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
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
  isKpi?: InputMaybe<Scalars['Boolean']['input']>;
  isSalaryCompany?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  lastNameEng: Scalars['String']['input'];
  level: Scalars['String']['input'];
  status: EmployeeStatus;
};

export type DeleteEmployeeInput = {
  terminationDate: Scalars['String']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  birthDayAndMonth?: Maybe<Scalars['String']['output']>;
  birthdayPoster?: Maybe<Scalars['String']['output']>;
  branch: Scalars['String']['output'];
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
  isKpi: Scalars['Boolean']['output'];
  isSalaryCompany: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  lastNameEng: Scalars['String']['output'];
  level: Scalars['String']['output'];
  numberOfVacationDays?: Maybe<Scalars['Int']['output']>;
  status: EmployeeStatus;
  terminationDate?: Maybe<Scalars['String']['output']>;
};

export enum EmployeeStatus {
  Active = 'ACTIVE',
  OnLeave = 'ON_LEAVE',
  Terminated = 'TERMINATED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Response;
  createAssignment: Response;
  createCategory: Response;
  createCensusEvent: Response;
  createEmployee: Response;
  deleteAsset: Response;
  deleteAssignment: Response;
  deleteCategory: Response;
  deleteEmployee: Response;
  finalizeCensusEvent: Response;
  updateAsset: Response;
  updateAssignment: Response;
  updateCensusTask: Response;
  updateEmployee: Response;
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


export type MutationDeleteAssetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: DeleteEmployeeInput;
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
  getEmployeeByCode?: Maybe<Employee>;
  getEmployeeById?: Maybe<Employee>;
  getEmployees: Array<Employee>;
  getEmployeesByStatus: Array<Employee>;
  getPendingAssignments: Array<Assignment>;
};


export type QueryGetAssetByIdArgs = {
  id: Scalars['ID']['input'];
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


export type QueryGetEmployeeByCodeArgs = {
  employeeCode: Scalars['String']['input'];
};


export type QueryGetEmployeeByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEmployeesByStatusArgs = {
  status: EmployeeStatus;
};


export type QueryGetPendingAssignmentsArgs = {
  token: Scalars['String']['input'];
};

export enum Response {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

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

export type DeleteAssetMutationVariables = Exact<{
  deleteAssetId: Scalars['ID']['input'];
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', deleteAsset: Response };

export type GetAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetsQuery = { __typename?: 'Query', getAssets: Array<{ __typename?: 'Asset', assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, currentBookValue?: number | null, assignedTo?: string | null, id: string, category?: { __typename?: 'Category', name: string } | null }> };

export type UpdateAssetMutationVariables = Exact<{
  updateAssetId: Scalars['ID']['input'];
  input: UpdateAssetInput;
}>;


export type UpdateAssetMutation = { __typename?: 'Mutation', updateAsset: Response };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: Response };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: Response };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, assets?: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, status: AssetStatusEnum, purchaseDate?: string | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, deletedAt?: string | null, category?: { __typename?: 'Category', id: string, name: string } | null }> | null }> };

export type GetAssetByIdQueryVariables = Exact<{
  getAssetByIdId: Scalars['ID']['input'];
}>;


export type GetAssetByIdQuery = { __typename?: 'Query', getAssetById?: { __typename?: 'Asset', id: string, serialNumber?: string | null, assetTag: string } | null };

export type GetPendingAssignmentsQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetPendingAssignmentsQuery = { __typename?: 'Query', getPendingAssignments: Array<{ __typename?: 'Assignment', id: string, signatureR2Key?: string | null, recentSignatureUrl?: string | null, recentSignatureKey?: string | null, asset?: { __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null, category?: { __typename?: 'Category', name: string, picture?: string | null } | null } | null }> };

export type UpdateAssignmentMutationVariables = Exact<{
  updateAssignmentId: Scalars['ID']['input'];
  input: UpdateAssignmentInput;
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: Response };


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
export const GetAssetsDocument = gql`
    query GetAssets {
  getAssets {
    assetTag
    category {
      name
    }
    serialNumber
    status
    currentBookValue
    assignedTo
    id
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
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    assets {
      id
      assetTag
      category {
        id
        name
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
export const GetAssetByIdDocument = gql`
    query getAssetById($getAssetByIdId: ID!) {
  getAssetById(id: $getAssetByIdId) {
    id
    serialNumber
    assetTag
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
        picture
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