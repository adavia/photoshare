import React, { PureComponent } from 'react';
import { Box, Text } from 'rebass/emotion';
import { graphql, compose, withApollo } from 'react-apollo';

import { ALL_PHOTOS_QUERY } from '../../modules/photos/queries';
import { CREATE_PHOTO_MUTATION } from '../../modules/photos/mutations';

import Upload from './Upload';

class PhotoNew extends PureComponent {
  state = {
    files: []
  }

  onDrop = (files) => {
    const { createPhoto, client } = this.props;
    
    this.setState({ files },
      async () => {
        const { data } = await createPhoto({ variables: { input: { file: files } } });
        this.setState({ files: data.createPhoto },
          () => {
            const { totalPhotos, allPhotos } = client.readQuery({ 
              query: ALL_PHOTOS_QUERY,
              variables: { offset: 0, limit: 5 } 
            });
            client.writeQuery({
              query: ALL_PHOTOS_QUERY,
              variables: { offset: 0, limit: 5 },
              data: { 
                totalPhotos: totalPhotos + data.createPhoto.length,
                allPhotos: allPhotos.concat(data.createPhoto) 
              }
            });
          }
        );
      }
    );
  }

  render() { 
    return (  
      <Box width={1} p={3}>
        <Text mb={3}>Attach some photos here!</Text>
        <Upload files={this.state.files} onDrop={this.onDrop} />
      </Box>
    );
  }
}
 
export default compose(
  graphql(CREATE_PHOTO_MUTATION, { name: 'createPhoto' })
)(withApollo(PhotoNew));