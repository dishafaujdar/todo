import express from 'express';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import jwksRsa from 'jwks-rsa';
import { expressjwt } from "express-jwt";
import User from './models/User.models.js';
import Todo from './models/Todo.models.js';
import 'dotenv/config';

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

const mongouri = process.env.MONGO_URL;
const secretkey = 'SecRETE';

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`server running on ${PORT}`));
}).catch((error) => {
  console.error('Connection error', error.message);
});

const authenticatejwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jsonwebtoken.verify(token, secretkey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

// Auth0 configuration
const domain = process.env.AUTH0_DOMAIN
const audience = process.env.AUTH0_AUDIENCE

// Middleware to authenticate JWT tokens
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`
  }),
  audience: auth0Audience,
  issuer: `https://${auth0Domain}/`,
  algorithms: ['RS256'],
  getToken: (req) => req.headers.authorization?.split(' ')[1],
});

// 
app.post('/auth0-login', checkJwt, async (req, res) => {
    const { sub: auth0Id, email } = req.user;
    console.log("data from auth:", req.user);

    try {
        let user = await User.findOne({ auth0Id });

        if (!user) {
            user = await User.create({ auth0Id, email });
        }

        const token = jsonwebtoken.sign({ email: user.email, _id: user._id }, secretkey, { expiresIn: '1h' });
        const todos = await Todo.find({ createdBy: user._id });

        return res.json({ message: "Login successful", token, todos });
    } catch (error) {
        console.error('Error logging in with Auth0:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received data:', req.body); // Log received data

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, password });
    const token = jsonwebtoken.sign({ email: newUser.email, _id: newUser._id }, secretkey, { expiresIn: '1h' });

    return res.json({ message: "User created", token });
  } catch (error) {
    console.error('Error creating user:', error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with: ', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userExist = await User.findOne({ email, password });

    if (!userExist) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const token = jsonwebtoken.sign({ email: userExist.email, _id: userExist._id }, secretkey, { expiresIn: '1h' });
    const todos = await Todo.find({ createdBy: userExist._id });

    return res.json({ message: "Login successful", token, todos });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/newtodo', authenticatejwt, async (req, res) => {
  console.log('POST /newtodo hit');
  console.log("req.user", req.user);

  const { content, time, date, priority } = req.body;
  if (!content || !time || !date || !priority) {
    return res.status(400).json({ message: "Content, date, time, and priority are required" });
  }

  try {
    const todo = await Todo.create({ content, time, date, priority, createdBy: req.user._id });
    return res.json({ message: "Todo created", todo });
  } catch (error) {
    console.error('Error creating todo:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/newtodo', authenticatejwt, async (req, res) => {
  try {
    const todos = await Todo.find({ createdBy: req.user._id }); // Use req.user._id to find todos by the user's ID
    return res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete('/newtodo', authenticatejwt, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ createdBy: req.user._id, _id: req.body.todoId });

    if (!todo) {
      return res.status(404).json({ message: 'No such task assigned' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;










// app.post('/auth0-login', checkJwt , async (req, res) => {

    //     const auth0Id = req.auth.sub;
    //     const email = req.auth['https://todo-app.com/email']; // Extract the custom claim
      
    //     // console.log("Email from Auth0:", email);
      
    //     try {
    //       let user = await User.findOne({ auth0Id });
      
    //       if (!user) {
    //         user = await User.create({ auth0Id, email });
    //       }
      
    //       const token = jsonwebtoken.sign({ email: user.email, _id: user._id }, secretkey, { expiresIn: '1h' });
    //       const todos = await Todo.find({ createdBy: user._id });
      
    //       return res.json({ message: "Login successful", token, todos });
    //     } catch (error) {
    //       console.error('Error logging in with Auth0:', error);
    //       return res.status(500).json({ message: "Internal server error" });
    //     }
    //   });