import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

const ModalContent = ({
  header,
  content,
  modalRef,
  onToggle,
  onClickAway
}) => {
  return ReactDOM.createPortal(
    <Overlay>
      <Modal innerRef={modalRef}>
        <Button type="button" onClick={onToggle} />
        <Header>{header}</Header>
        <Container>{content}</Container>
      </Modal>
    </Overlay>,
    document.body
  );
}

const Overlay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  overflow-x: hidden;
  overflow-y: auto;
  transform-origin: 50% 50%;
`

const Modal = styled('div')`
  width: 60%;
  background-color: #FFF;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  @media (max-width: 576px) {
    width: 100%
  }
`

const Header = styled('div')`
  border-bottom: 1px solid rgba(34,36,38,.15);
  padding: 0.7em;
  font-size: 1.2em;
  color: ${props => props.theme.colors.grayLight};
  font-family: ${props => props.theme.fonts.Dosis};
  font-weight: 700;
`

const Container = styled('div')``

const Button = styled('button')`
  position: fixed;
  top: 0;
  right: 0;
  background: #FFF;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  cursor: pointer;
  outline: 0;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.2);

  &:before, &:after {
    content: "";
    position: absolute;
    top: 1.2rem;
    left: 0.25rem;
    width: 2rem;
    height: 0.1rem;
    background-color: #888;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  &:hover:before, &:hover:after {
    background-color: #444;
  }
`
 
export default ModalContent;