import React from 'react';
import PropTypes from 'prop-types';

const Goal = (props) => {
  return (
    <span 
      onClick={props.toggleCompleted}
      className={props.completed ? "completed goal" : "goal"}
    >
      {props.goal}
    </span>
  );
}

Goal.propTypes = {
  goal: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleCompleted: PropTypes.func.isRequired
}; 

export default Goal;