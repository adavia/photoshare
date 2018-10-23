import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
    }
  }
`

export const ALL_USERS_QUERY = gql`
  query {
    totalUsers
    allUsers {
      id
      avatar {
        thumb
      }
      username
      email
    }
  }
`