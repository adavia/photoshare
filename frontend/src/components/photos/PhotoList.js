import React from 'react';
import { Flex } from 'rebass/emotion';

import PhotoItem from './PhotoItem';

const PhotoList = ({ count, photos }) => {
  return (
    <Flex flexWrap="wrap" m={2}>
      {photos.map(photo =>
        <PhotoItem key={photo.id} photo={photo} />
      )}
    </Flex>
  );
}

export default PhotoList