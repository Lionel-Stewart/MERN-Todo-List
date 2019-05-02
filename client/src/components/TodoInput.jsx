import React from 'react';
import PropTypes from 'prop-types';

const TodoInput = (props) => {
  return (
    <div>
      <h1>
        To-do List 
        <i id="plus" className="fa fa-plus" onClick={props.toggle} />
      </h1>

      <form onSubmit={props.onSubmit} required>
        <input 
          id="todo-input"
          name="goal"
          maxLength="24"
          placeholder="Add New Todo"
          value={props.goal}
          onChange={props.onChange}
          className={props.hideInput===true ? 'hidden' : ''}
        />
      </form>
    </div>
  );
}

TodoInput.propTypes = {
  goal: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  hideInput: PropTypes.bool.isRequired
}; 

export default TodoInput;