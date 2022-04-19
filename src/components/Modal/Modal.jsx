import React from 'react';
import './Modal.scss';

export const Modal = (props) => {
  const { toggleModal } = props;
  return (
    <div
      onClick={() => toggleModal()}
      className="overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal"
      >
        {props.children}
      </div>
    </div>
  )
}