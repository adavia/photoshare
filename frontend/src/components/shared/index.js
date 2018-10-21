import styled from 'react-emotion';
import { Button as ButtonDefault } from 'rebass/emotion';

export const Button = styled(ButtonDefault)`
  background: ${props => props.theme.colors.lightYellow};
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.yellow};
  }
`