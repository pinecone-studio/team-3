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
  returnedAt?: Maybe<Scalars['String']['output']>;
  signatureR2Key?: Maybe<Scalars['String']['output']>;
};

export type CreateAssetInput = {
  assetTag: Scalars['String']['input'];
  category: Scalars['String']['input'];
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
  createEmployee: Response;
  deleteAsset: Response;
  deleteAssignment: Response;
  deleteEmployee: Response;
  updateAsset: Response;
  updateAssignment: Response;
  updateEmployee: Response;
};


export type MutationCreateAssetArgs = {
  input: CreateAssetInput;
};


export type MutationCreateAssignmentArgs = {
  input: CreateAssignmentInput;
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


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: DeleteEmployeeInput;
};


export type MutationUpdateAssetArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAssetInput;
};


export type MutationUpdateAssignmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAssignmentInput;
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
  getAssignmentByToken: Assignment;
  getAssignments: Array<Assignment>;
  getAssignmentsByAsset: Array<Assignment>;
  getAssignmentsByEmployee: Array<Assignment>;
  getEmployeeByCode?: Maybe<Employee>;
  getEmployeeById?: Maybe<Employee>;
  getEmployees: Array<Employee>;
  getEmployeesByStatus: Array<Employee>;
};


export type QueryGetAssetByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssignmentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssignmentByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetAssignmentsByAssetArgs = {
  assetId: Scalars['ID']['input'];
};


export type QueryGetAssignmentsByEmployeeArgs = {
  employeeId: Scalars['ID']['input'];
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
  category?: InputMaybe<Scalars['String']['input']>;
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

export type GetAssetByIdQueryVariables = Exact<{
  getAssetByIdId: Scalars['ID']['input'];
}>;


export type GetAssetByIdQuery = { __typename?: 'Query', getAssetById?: { __typename?: 'Asset', id: string, serialNumber?: string | null, assetTag: string } | null };

export type GetAssignmentByTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetAssignmentByTokenQuery = { __typename?: 'Query', getAssignmentByToken: { __typename?: 'Assignment', id: string, employeeId: string, asset?: { __typename?: 'Asset', id: string, assetTag: string, serialNumber?: string | null } | null } };

export type UpdateAssignmentMutationVariables = Exact<{
  updateAssignmentId: Scalars['ID']['input'];
  input: UpdateAssignmentInput;
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: Response };


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
export const GetAssignmentByTokenDocument = gql`
    query GetAssignmentByToken($token: String!) {
  getAssignmentByToken(token: $token) {
    asset {
      id
      assetTag
      serialNumber
    }
    id
    employeeId
  }
}
    `;
export function useGetAssignmentByTokenQuery(baseOptions: Apollo.QueryHookOptions<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables> & ({ variables: GetAssignmentByTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>(GetAssignmentByTokenDocument, options);
      }
export function useGetAssignmentByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>(GetAssignmentByTokenDocument, options);
        }
// @ts-ignore
export function useGetAssignmentByTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>;
export function useGetAssignmentByTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>): Apollo.UseSuspenseQueryResult<GetAssignmentByTokenQuery | undefined, GetAssignmentByTokenQueryVariables>;
export function useGetAssignmentByTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>(GetAssignmentByTokenDocument, options);
        }
export type GetAssignmentByTokenQueryHookResult = ReturnType<typeof useGetAssignmentByTokenQuery>;
export type GetAssignmentByTokenLazyQueryHookResult = ReturnType<typeof useGetAssignmentByTokenLazyQuery>;
export type GetAssignmentByTokenSuspenseQueryHookResult = ReturnType<typeof useGetAssignmentByTokenSuspenseQuery>;
export type GetAssignmentByTokenQueryResult = Apollo.QueryResult<GetAssignmentByTokenQuery, GetAssignmentByTokenQueryVariables>;
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