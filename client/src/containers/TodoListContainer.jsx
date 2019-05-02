import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import TodoTabs from '../components/TodoTabs';
import EightBallButton from '../components/EightBallButton';
import PaginationLinks from '../components/PaginationLinks';

//Containers
import EditTodoContainer from './EditTodoContainer'; 
import TodoInputContainer from './TodoInputContainer';
import DeleteButtonContainer from './DeleteButtonContainer';

//Redux
import { connect } from 'react-redux';
import { getTodos } from '../actions/todoActions';

class TodoItemsContainer extends Component { 
  
  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    const command = this.props.routeProps.match.params.command;
    const pageNumber = parseInt(this.props.routeProps.match.params.pageNumber) || 1;

    this.props.getTodos(command, pageNumber);
  }

  
  onCommandPropChange = (prevProps) => {
    const previousCommand = prevProps.routeProps.match.params.command;
    const currentCommand = this.props.routeProps.match.params.command;

    if(previousCommand!==currentCommand){
      this.getTodos();
    }
  }

  onPageNumberPropChange = (prevProps) => {
    const currentPageNumber = this.props.routeProps.match.params.pageNumber;
    const previousPageNumber = prevProps.routeProps.match.params.pageNumber;
    
    if(previousPageNumber!==currentPageNumber){
      this.getTodos();
    }
  }
  
  onTodoDeleted = (prevProps) => {
    const currentNumberOfTodos  = this.props.todo.numberOfTodos;
    const previousNumberOfTodos = prevProps.todo.numberOfTodos;
    const previousPageSize = Math.floor((prevProps.todo.numberOfTodos-1)/5) + 1;
    
    if(previousNumberOfTodos > currentNumberOfTodos){
      if(previousPageSize>1){
        this.getTodos();
      }
    }
  }

  ifPageIsEmpty = () => {
    const todos = this.props.todo.todos;
    const loading = this.props.todo.loading;
    const command = this.props.routeProps.match.params.command;
    const pageNumber = this.props.routeProps.match.params.pageNumber;

    if(todos.length===0 && loading===false && pageNumber!==1){
      window.location = `/todos/${command}`;
    }
  }

  componentDidUpdate(prevProps) {
    this.onCommandPropChange(prevProps);
    this.onPageNumberPropChange(prevProps);
    this.onTodoDeleted(prevProps);
    this.ifPageIsEmpty();
  }

  render() {
    const { todos } = this.props.todo;
    const command = this.props.routeProps.match.params.command;
    const pageSize = Math.floor((this.props.todo.numberOfTodos-1)/5) + 1;
    const pageNumber = parseInt(this.props.routeProps.match.params.pageNumber) || 1;
    return (
      <div>
        <TodoTabs command={command} />
        <TodoInputContainer />

        <ul id="content">
          {todos.map(({ _id, goal, completed }) => (
            <li key={_id}>
              <DeleteButtonContainer id={_id} />

              <EightBallButton goal={goal} />

              <EditTodoContainer 
                id={_id} 
                goal={goal} 
                completed={completed} 
              />
            </li>
          ))}
        </ul>

        <PaginationLinks 
          command={command}
          pageSize={pageSize}
          pageNumber={pageNumber}
        />
      </div> 
    );
  }
}

TodoItemsContainer.propTypes = {
  todo: PropTypes.object.isRequired,
  getTodos: PropTypes.func.isRequired,
  routeProps: PropTypes.object.isRequired
}; 

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { getTodos }
)(TodoItemsContainer);