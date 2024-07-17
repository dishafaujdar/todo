// // Routes for user registration and login
import express from 'express';
import User from '../models/User.models';
const Router = express.Router();

Router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  });
  
Router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) return res.sendStatus(403);
    const token = jwt.sign({ email: user.email, id: user._id }, 'secret');
    res.json({ token });
  });
  

  module.exports = Router;
  
//   app.put('/todos/:id', authenticateToken, async (req, res) => {
//     const todo = await Todo.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { completed: req.body.completed }, { new: true });
//     res.json(todo);
//   });
  
//   // Check completion and send OTP
//   // app.post('/check-completion', authenticateToken, async (req, res) => {
//   //   const todos = await Todo.find({ userId: req.user.id });
//   //   if (todos.every(todo => todo.completed)) {
//   //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
//   // });
  
  