import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Containers
import TodoListContainer from './containers/TodoListContainer';

//CSS
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TodoList.css';

class App extends Component {
  render(){
    return (
      <div id="container">
        <BrowserRouter>
          <Switch>

            <Route exact path="/">
              <Redirect to="/todos/all" />
            </Route>

            <Route 
              path="/todos/:command/page/1"
              render={routeProps => (
                <Redirect to={`/todos/${routeProps.match.params.command}`} />
              )}
            />

            <Route 
              path="/todos/:command/page/:pageNumber" 
              render={routeProps => (
                <TodoListContainer routeProps={routeProps} />
              )} 
            />

            <Route 
              path="/todos/:command" 
              render={routeProps => (
                <TodoListContainer routeProps={routeProps} />
              )} 
            /> 

            <Route path="/">
              <Redirect to="/todos/all" />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    )
  } 
}


export default App;