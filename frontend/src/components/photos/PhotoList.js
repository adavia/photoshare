import React from 'react';
import styled from 'react-emotion';
import { Flex, Box } from 'rebass/emotion';

import { Button } from '../shared';

import PhotoItem from './PhotoItem';

const PhotoList = ({ count, photos, onLoadMore, allPhotosLength }) => {
  return (
    <Flex flexWrap="wrap" m={2}>
      {photos.map(photo =>
        <PhotoItem key={photo.id} photo={photo} />
      )}
      <ButtonContent width={1} m={2}>
        {allPhotosLength < count &&
          <Button onClick={onLoadMore}>
            Fetch more results
          </Button>
        }
      </ButtonContent>
    </Flex>
  );
}

const ButtonContent = styled(Box)`
  text-align: center;
`

export default PhotoList