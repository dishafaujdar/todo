import express from 'express';
import Todo from '../models/Todo.models';

const Router = express.Router();

// To-do routes
Router.get('/todos', authenticateToken, async (req, res) => {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  });
  
  Router.post('/todos', authenticateToken, async (req, res) => {
    const todo = new Todo({
      userId: req.user.id,
      task: req.body.task,
      completed: false,
    });
    await todo.save();
    res.status(201).json(todo);
  });

  module.exports = Router