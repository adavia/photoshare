import React from 'react';

const ModalTrigger = ({ onToggle, element }) => {
  const trigger = React.cloneElement(element, { onClick: onToggle });
  return trigger;
}

export default ModalTrigger;