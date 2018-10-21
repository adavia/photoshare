import React, { PureComponent, Fragment } from 'react';

import ModalTrigger from './ModalTrigger';
import ModalContent from './ModalContent';

class ModalBase extends PureComponent {
  state = {
    showModal: false
  }

  onToggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  // onClickAway = (e) => {
  //   if (this.modal && this.modal.contains(e.target)) return;
  //   this.onToggleModal();
  // };

  render () {
    const { ariaLabel, children, element } = this.props;
    const { showModal } = this.state;
    
    return (
      <Fragment>
        <ModalTrigger
          onToggle={this.onToggleModal}
          element={element}
        />
        {showModal &&
          <ModalContent
            header={ariaLabel}
            modalRef={node => (this.modal = node)}
            content={children}
            onToggle={this.onToggleModal}
          />
        }
      </Fragment>
    );
  }
}

export default ModalBase;
