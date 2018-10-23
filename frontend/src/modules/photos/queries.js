import { gql } from 'apollo-boost';

export const ALL_PHOTOS_QUERY = gql`
  query($offset: Int!$limit: Int!) {
    totalPhotos
    allPhotos(
      offset: $offset 
      limit: $limit
    ) {
      id
      thumb
      postedBy {
        username
      }
    }
  }
`