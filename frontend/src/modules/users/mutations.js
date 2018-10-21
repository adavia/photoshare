import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      id
      username
      email
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
    ) {
      id
    }
  }
`