import { 
  GET_TODOS, 
  GET_NUMBER_OF_TODOS,
  CREATE_TODO, 
  UPDATE_TODO, 
  DELETE_TODO, 
  TODOS_LOADING 
} from '../actions/constants';

const initialState = {
  todos: [],
  loading: false,
  numberOfTodos: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return { 
        ...state, 
        todos: action.payload,
        loading: false
      };
    case GET_NUMBER_OF_TODOS:
      return { 
        ...state, 
        numberOfTodos: action.payload
      };
    case CREATE_TODO:
      return {
        ...state, 
        todos: [action.payload, ...state.todos.slice(0, 4)],
        numberOfTodos: state.numberOfTodos + 1
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo)=>
          todo._id === action.id 
          ? {...todo, 
              goal: action.payload.goal,
              completed: action.payload.completed
            } 
          : todo
        ) 
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        numberOfTodos: state.numberOfTodos - 1
      };
    case TODOS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}