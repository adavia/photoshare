import React from 'react';
import { Flex, Box, Heading } from 'rebass/emotion';

import UserItem from './UserItem';

const UserList = ({ count, users }) => {
  return (
    <Flex flexWrap="wrap" m={2}>
      <Box width={1} m={2}>
        <Heading fontSize={[ 3, 4, 4 ]}>TOTAL USERS: {count}</Heading>
      </Box>
      {users.map(user =>
        <UserItem key={user.id} user={user} />
      )}
    </Flex>
  );
}

export default UserList