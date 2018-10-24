import React from 'react';
import styled from 'react-emotion';
import { Flex, Box, Text } from 'rebass/emotion';

import noUserImg from '../../images/no_user.png';

const UserItem = ({ user }) => {
  return (  
    <Box px={2} py={2} width={[1, 1/4]}>
      <Item px={3} py={2}>
        <Flex alignItems="center">
          <Image src={user.avatar ? user.avatar.thumb : noUserImg} />
          <Details>
            <Name>{user.username}</Name>
            <Description>{user.email}</Description>
          </Details>
        </Flex>
      </Item>
    </Box>
  );
}

const Item = styled(Box)`
  border-radius: .2em;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  transition: box-shadow .1s ease, transform .1s ease;
`

const Image = styled('img')`
  width: 20%;
  height: 20%;
  border-radius: 4px;
  margin-right: 10px;
`

const Details = styled(Box)``

const Name = styled(Text)`
  font-family: ${props => props.theme.fonts.Dosis};
  color: ${props => props.theme.colors.grayLight};
  font-size: 1.3em;
  font-weight: 700;
`

const Description = styled(Text)`
  font-size: 15px;
`
 
export default UserItem;