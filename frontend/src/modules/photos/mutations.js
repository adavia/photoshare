import { gql } from 'apollo-boost';

export const CREATE_PHOTO_MUTATION = gql`
  mutation ($input: PostPhotoInput!) {
    createPhoto(input: $input) {
      id
      thumb
    }
  }
`