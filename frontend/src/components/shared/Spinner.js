import React from 'react';
import { Box } from 'rebass/emotion';
import Loader from 'react-spinkit';

const Spinner = () => {
  return ( 
    <Box my={6} mx="auto" width="5%">
      <Loader 
        fadeIn="half"
        name="ball-scale-multiple" 
        color="#FFB400"
      />
    </Box>
  );
}

export default Spinner;