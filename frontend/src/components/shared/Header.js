import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Link as DefaultLink } from 'rebass/emotion';
import styled from 'react-emotion';

import ModalBase from './Modal/ModalBase';
import PhotoNew from '../photos/PhotoNew';

const Header = ({ currentUser }) => {
  const modalProps = {
    ariaLabel: 'Photo uploader!',
    element: <Trigger mx={[0, 2]} my={[2, 0]}>Add new photo</Trigger>
  };

  return (
    <Container>
      <Content flexDirection={['column', 'row']} m={3}>
        <Link to="/">
          <Logo mb={[1, 0]}>PHOTOSHARE</Logo>
        </Link>
        <ModalBase {...modalProps}>
          <PhotoNew />
        </ModalBase>
        <Link to="/photos">
          All Photos
        </Link>
        <Box mx='auto' />
        <Settings mt={[1, 0]}>Hi!, {currentUser.email} - {" "}
          <Link to="/auth/logout"><Logout>log out</Logout></Link>
        </Settings>
      </Content>
    </Container>
  )
}

const Container = styled('header')`
  grid-area: header;
  background: ${props => props.theme.colors.yellow};
  grid-column: 1 / span 3;
  a {
    text-decoration: none;
    color: inherit;
  }
  a:not(:last-child) {
    padding: 0 20px 0 0;
  }
`

const Content = styled(Flex)`
  color: ${props => props.theme.colors.lightGray};
`

const Logo = styled(Text)`
  font-family: ${props => props.theme.fonts.Dosis};
  font-size: 1.5em;
  line-height: 1rem;
  font-weight: 700;
`

const Settings = styled(Box)`
  font-size: 15px;
`

const Logout = styled('span')`
  font-weight: bold;
  cursor: pointer;
`

const Trigger = styled(DefaultLink)`
  cursor: pointer;
`
 
export default Header;