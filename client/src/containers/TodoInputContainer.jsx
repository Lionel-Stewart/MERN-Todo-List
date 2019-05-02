import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

//Components
import TodoInput from '../components/TodoInput';

//Redux
import { connect } from 'react-redux';
import { createTodo } from '../actions/todoActions';

class TodoInputContainer extends Component {
  state = {
    goal: '',
    hideInput: false,
    todoExists: false
  }

  clearInput = () => {
    this.setState({
      goal: '' 
    });
  }

  checkIfTodoExists = (goal) => {
    axios.get(`/api/todos/verify?goal=${goal}`).then(res =>
      res.data===0 
        ? this.setState({todoExists: false }, () => this.createTodo())
        : this.setState({todoExists: true }, () => this.createTodo())  
    ).catch(err => console.log(err));
  }

  createTodo = () => {
    const newTodo = {
      goal: this.state.goal
    }; 

    this.state.todoExists 
      ? alert("Todo already exists")
      : this.props.createTodo(newTodo);

    this.clearInput() 
  }

  onSubmit = e => {
    e.preventDefault();

    if(this.state.goal===''){
      alert("Todo cannot be empty")
    } else {
      this.checkIfTodoExists(this.state.goal);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggle = () => {
    this.setState({
      hideInput: !this.state.hideInput 
    });
  }

  render() {
    return (
      <TodoInput 
        goal={this.state.goal}
        toggle={this.toggle}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        hideInput={this.state.hideInput}
      />
    );
  }
}

TodoInputContainer.propTypes = {
  createTodo: PropTypes.func.isRequired
}; 

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { createTodo }
)(TodoInputContainer);