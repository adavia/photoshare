import { gql } from 'apollo-boost';

export const ALL_PHOTOS_QUERY = gql`
  query {
    totalPhotos
    allPhotos {
      id
      thumb
      postedBy {
        username
      }
    }
  }
`