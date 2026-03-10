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

export type Data = {
  __typename?: 'Data';
  category?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  testMutation: Response;
};

export type Query = {
  __typename?: 'Query';
  testQuery: Array<Data>;
};

export enum Response {
  Failed = 'Failed',
  Success = 'Success'
}

export enum Test {
  Haha = 'haha'
}

export type TestQueryResponse = {
  __typename?: 'TestQueryResponse';
  result: Scalars['String']['output'];
};

export type TestQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', testQuery: Array<{ __typename?: 'Data', category?: string | null, id: string, name: string }> };


export const TestQueryDocument = gql`
    query TestQuery {
  testQuery {
    category
    id
    name
  }
}
    `;
export function useTestQueryQuery(baseOptions?: Apollo.QueryHookOptions<TestQueryQuery, TestQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQueryQuery, TestQueryQueryVariables>(TestQueryDocument, options);
      }
export function useTestQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQueryQuery, TestQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQueryQuery, TestQueryQueryVariables>(TestQueryDocument, options);
        }
// @ts-ignore
export function useTestQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TestQueryQuery, TestQueryQueryVariables>): Apollo.UseSuspenseQueryResult<TestQueryQuery, TestQueryQueryVariables>;
export function useTestQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TestQueryQuery, TestQueryQueryVariables>): Apollo.UseSuspenseQueryResult<TestQueryQuery | undefined, TestQueryQueryVariables>;
export function useTestQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TestQueryQuery, TestQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TestQueryQuery, TestQueryQueryVariables>(TestQueryDocument, options);
        }
export type TestQueryQueryHookResult = ReturnType<typeof useTestQueryQuery>;
export type TestQueryLazyQueryHookResult = ReturnType<typeof useTestQueryLazyQuery>;
export type TestQuerySuspenseQueryHookResult = ReturnType<typeof useTestQuerySuspenseQuery>;
export type TestQueryQueryResult = Apollo.QueryResult<TestQueryQuery, TestQueryQueryVariables>;