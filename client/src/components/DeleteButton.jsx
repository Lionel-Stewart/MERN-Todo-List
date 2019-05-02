import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = (props) => {
  return (
    <span className='delete button' title='delete todo' onClick={props.onDeleteClick}>
      <i className='fa fa-trash'></i>
    </span>
  );
}

DeleteButton.propTypes = {
  onDeleteClick: PropTypes.func.isRequired
}; 

export default DeleteButton;