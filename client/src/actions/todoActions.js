import axios from 'axios';
import { 
  GET_TODOS, 
  GET_NUMBER_OF_TODOS,
  CREATE_TODO, 
  UPDATE_TODO, 
  DELETE_TODO, 
  TODOS_LOADING 
} from './constants';

export const getTodos = (command, pageNumber) => dispatch => {
  dispatch(setTodosLoading());
  dispatch(getNumberOfTodos(command)); 
  axios.get(`/api/todos?command=${command}&page=${pageNumber}`).then(res =>
    dispatch({
      type: GET_TODOS,
      payload: res.data
    })
  ).catch(err => console.log(err));
};

export const getNumberOfTodos = command => dispatch => {
  axios.get(`/api/todos/length?command=${command}`).then(res =>
    dispatch({
      type: GET_NUMBER_OF_TODOS,
      payload: res.data
    })
  ).catch(err => console.log(err));
};

export const createTodo = todo => dispatch => {
  axios.post('/api/todos', todo).then(res =>
    dispatch({
      type: CREATE_TODO,
      payload: res.data
    })
  ).catch(err => console.log(err));
};

export const updateTodo = todo => dispatch => {
  axios.put(`/api/todos/${todo.id}`, todo).then(res => 
    dispatch({
      id: todo.id,
      type: UPDATE_TODO,
      payload: todo 
    })
  ).catch(err => console.log(err));
};

export const deleteTodo = id => dispatch => {
  axios.delete(`/api/todos/${id}`).then(res =>
    dispatch({
      type: DELETE_TODO,
      payload: id
    })
  ).catch(err => console.log(err));
};

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING
  };
};