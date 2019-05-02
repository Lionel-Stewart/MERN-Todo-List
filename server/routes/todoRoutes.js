const express = require('express');
const router  = express.Router();

//Models
const Todo = require('../models/Todo');

// @route   GET api/todos
// @desc    Get Todos Based on Query
// @access  Public
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  switch(req.query.command){
    case("completed"): 
      Todo.findTodo({completed: true}, page, (err, completedTodos) => {
        err ? res.status(500).send(err) : res.json(completedTodos)   
      });
      break

    case("uncompleted"):
      Todo.findTodo({completed: {$ne: true}}, page, (err, uncompletedTodos) => {
        err ? res.status(500).send(err) : res.json(uncompletedTodos) 
      });
      break

    default:
      Todo.findTodo(null, page, (err, allTodos) => {
        err ? res.status(500).send(err) : res.json(allTodos)  
      });
  }
});

// @route   GET api/todos/length
// @desc    Get Number of Todos Based on Query
// @access  Public
router.get("/length", (req, res) => { 
  switch(req.query.command){
    case("completed"): 
      Todo.countTodos({completed: true}, (err, numberofCompletedTodos) => {
        err ? res.status(500).send(err) : res.json(numberofCompletedTodos) 
      });
      break;

    case("uncompleted"):
      Todo.countTodos({completed: {$ne: true}}, (err, numberofUncompletedTodos) => {
        err ? res.status(500).send(err) : res.json(numberofUncompletedTodos) 
      });
      break;

    default:
      Todo.countTodos(null, (err, numberofTodos) => {
        err ? res.status(500).send(err) : res.json(numberofTodos) 
      });
  }
});

// @route   GET api/todos/verify
// @desc    Check if Todo Exists
// @access  Public
router.get("/verify", (req, res) => { 
  Todo.countTodos({goal: req.query.goal.toLowerCase()}, (err, numberofTodos) => {
    err ? res.status(500).send(err) : res.json(numberofTodos) 
  });
});

// @route   POST api/todos
// @desc    Create A Todo
// @access  Public
router.post('/', (req, res) => {
  const newTodo = new Todo({
    goal: req.body.goal.toLowerCase()
  }); 

  Todo.addTodo(newTodo, (err, todo) => {
    err ? res.status(500).send(err) : res.json(todo) 
  });
});


// @route   PUT api/todos/:id
// @desc    Update A Todo
// @access  Public
router.put('/:id', (req, res) => {
  const updatedTodo = {
    goal: req.body.goal, 
    completed: req.body.completed
 }; 
  
  Todo.updateTodo({_id: req.params.id}, updatedTodo, (err, todo) => {
    err ? res.status(404).send(err) : res.json(todo);
  }); 
});

// @route   DELETE api/todos/:id
// @desc    Delete A Todo
// @access  Public
router.delete('/:id', (req, res) => {
  Todo.deleteTodo(req.params.id, err => {
    err ? res.status(404).send(err) : res.json({sucess:true, msg:'Todo Deleted'});
  });
});

module.exports = router;