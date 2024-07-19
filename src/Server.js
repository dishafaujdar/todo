import express from 'express';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './models/User.models.js';
import Todo from './models/Todo.models.js';

const PORT=3000;
const app=express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
const mongouri="mongodb+srv://dishasupreme11:disha123@useroftodo.sknowvs.mongodb.net/todo-webapp?retryWrites=true&w=majority&appName=userofTodo";
const secretkey= 'SecRETE';

mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>console.log(`server running on ${PORT}`)); 
  }).catch((error) => {
    console.error('Connection error', error.message);
  });

// const jwtToken = (user) => {
//     const payload = { username: user.username };
//     return jwt.sign(payload, secretkey, { expiresIn: '1h' });
// };

// mongoose.connect('mongodb://localhost:27017/userinfo')
//     .then(() => console.log('MongoDB connected'))    
//     .catch(err => console.log(err));

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
        return  res.sendStatus(401);
    }
};

// const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' }); In the provided code, the jwt.sign function from the jsonwebtoken library is used to create a JSON Web Token (JWT). Here's a breakdown of the code: This is use when we use mongoose or have a database 

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received data:', req.body); // Log received data

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try 
    {
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }        
        else {
            const newUser = await User.create({email,password});
            const token =jsonwebtoken.sign({ email: newUser.email, _id: newUser._id }, secretkey, { expiresIn: '1h' });
            console.log(token);
            return res.json({ message: "User created", token });
        } 
        
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1)
        {
            return res.status(409).json({ message: "Email is already registered" });
        }        
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with: ',req.body);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const userExist = await User.findOne({email,password});

        if (!userExist) {
            return res.status(403).json({ message: "Invalid username or password" });
        }
        const token = jsonwebtoken.sign({ email: userExist.email, _id: userExist._id }, secretkey, { expiresIn: '1h' });
        const todos = await Todo.find({ createdBy: userExist._id });
        console.log(token);
        return res.json({ message: "Login successful", token , todos});

    } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: "Internal server error" });
    }
}); 

app.post('/newtodo', authenticatejwt, async (req, res) => {
    console.log('POST /newtodo hit');
    console.log("req.user", req.user);
  
    const { content, time ,date, priority } = req.body;
    if (!content || !time ||  !date || !priority) {
      return res.status(400).json({ message: "Content, date, and priority are required" });
    }
    try {
      const todo = await Todo.create({ content, time, date, priority, createdBy: req.user._id });
      console.log('todo', todo);
      return res.json({ message: "Todo created", todo });
    } catch (error) {
      console.error('Error creating todo:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
app.get('/newtodo', authenticatejwt, async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.user._id });  // Use req.user._id to find todos by the user's ID
        return res.json(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
app.delete('/newtodo',authenticatejwt,async(req,res)=>{
    try{
        const todos= await Todo.findByIdAndDelete({createdBy: req.user._id});
        if(!todos){
            return res.status(404).json({message:'no such task assigned'})
        }
        return res.status(200).json({message:'Task deleted successfully'})
    }catch(error){
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: "Internal server error" });
      }
});
export default app;