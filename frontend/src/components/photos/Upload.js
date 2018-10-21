import React from 'react';
import styled from 'react-emotion';
import { Flex, Text } from 'rebass/emotion';
import Dropzone from 'react-dropzone';

import Spinner from 'react-spinkit';

const Upload = ({ files, onDrop }) => {
  return (  
    <Flex>
      {files.map((file, i) =>
        <Preview key={file.name + i || file.id}>
          {file.thumb ? (
            <Image alt="image" src={file.thumb} />
          ) : (
            <Spinner name="line-scale-party" />
          )}
        </Preview>
      )}
      <Dropzone onDrop={onDrop} style={{}}>
        <Container>
          <Text>Upload</Text>
        </Container>
      </Dropzone>
    </Flex>
  );
}

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  width: 150px;
  height: 150px;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    border-color: gray;
  }
`

const Preview = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border: 1px solid #d9d9d9;
  width: 150px;
  height: 150px;
  border-radius: 4px;
`

const Image = styled('img')`
  max-width: 140px;
`;
 
export default Upload;