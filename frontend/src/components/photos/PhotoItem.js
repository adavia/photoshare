import React from 'react';
import styled from 'react-emotion';
import { Box, Image } from 'rebass/emotion';

const PhotoItem = ({ photo }) => {
  return (  
    <Item 
      mx={2}
      my={2}
      width={[ 1, 1, 1/8 ]}>
      <Image
        p={1}
        src={photo.thumb}
        borderRadius={8}
      />
    </Item>
  );
}

const Item = styled(Box)`
  border: 1px solid #d4d4d5;
  cursor: pointer;
`
 
export default PhotoItem;