import React from 'react';
import { Query } from 'react-apollo';

import { ALL_PHOTOS_QUERY } from '../../modules/photos/queries';

import Spinner from '../shared/Spinner';
import PhotoList from './PhotoList';

const PhotoListView = () => {
  return (
    <Query query={ALL_PHOTOS_QUERY}>
      {({data, loading}) => loading ?
        <Spinner /> :
        <PhotoList count={data.totalPhotos} photos={data.allPhotos} />
      }
    </Query>
  );
}

export default PhotoListView;