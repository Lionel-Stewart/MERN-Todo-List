import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import Goal from '../components/Goal';
import EditTodoModal from '../components/EditTodoModal';

//Redux
import { connect } from 'react-redux';
import { updateTodo } from '../actions/todoActions';

class EditFormContainer extends Component {
  state = {
    goal: this.props.goal, 
    newGoal: this.props.goal,
    isOpen: false,
    completed: this.props.completed 
  }

  updateTodo = () => {
    const updatedTodo = {
      id: this.props.id,
      goal: this.state.newGoal,
      completed: this.state.completed
    }; 

    this.props.updateTodo(updatedTodo);
    this.setState({goal: this.state.newGoal});
    this.toggle();
  }

  onSubmit = e => {
    e.preventDefault();

    this.state.newGoal==='' 
      ? alert("Todo cannot be empty")
      : this.updateTodo()
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleCompleted = () => {
    this.setState({
      completed: !this.state.completed 
    });

    const updatedTodo = {
      id: this.props.id,
      goal: this.props.goal,
      completed: !this.state.completed
    }; 

    this.props.updateTodo(updatedTodo);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return ( 
      <span>
        <EditTodoModal 
          goal={this.state.newGoal.toLowerCase()}
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />

        <Goal 
          goal={this.state.goal.toLowerCase()}
          completed={this.state.completed}
          toggleCompleted={this.toggleCompleted}
        />
      </span>
    );
  }
}

EditFormContainer.propTypes = {
  id: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  updateTodo: PropTypes.func.isRequired
}; 

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { updateTodo }
)(EditFormContainer);