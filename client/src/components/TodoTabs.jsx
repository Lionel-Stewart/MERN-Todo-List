import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TodoTabs = (props) => {
  return (
    <h1>

      <Link to="/todos/all">
        <button className={props.command === 'all' ? "active tab" : "tab"}>
          All
        </button>
      </Link> 

      <Link to="/todos/completed">
        <button className={props.command === 'completed' ? "active tab" : "tab"}>
          Completed
        </button>
      </Link>

      <Link to="/todos/uncompleted">
        <button className={props.command === 'uncompleted' ? "active tab" : "tab"}>
          Uncompleted
        </button>
      </Link>

    </h1>
  );
}

TodoTabs.propTypes = {
  command: PropTypes.string.isRequired
};

export default TodoTabs;