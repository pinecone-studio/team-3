import gql from "graphql-tag";

export const commonTypeDefs = gql `
enum Response {
    Success
    Failed
}
`