import React from 'react';
import { Query } from 'react-apollo';

import { ALL_PHOTOS_QUERY } from '../../modules/photos/queries';

import Spinner from '../shared/Spinner';
import PhotoList from './PhotoList';

const PhotoListView = ({ variables }) => {
  return (
    <Query query={ALL_PHOTOS_QUERY} variables={{offset: 0, limit: 5}}>
      {({data, loading, fetchMore}) => {
        if (loading) {
          return <Spinner />
        }

        return (
          <PhotoList 
            count={data.totalPhotos} 
            photos={data.allPhotos} 
            allPhotosLength={data.allPhotos.length}
            onLoadMore={() => fetchMore({
              variables: {
                offset: data.allPhotos.length
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...prev,
                  allPhotos: [...prev.allPhotos, ...fetchMoreResult.allPhotos]
                }
              }
            })}
          />
        );
      }}
    </Query>
  );
}

export default PhotoListView;