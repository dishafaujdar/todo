import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
// import mongoose from 'mongoose';
// import {User} from './models/user.models.js'
// import {TODO} from './models/todo.models.js'
const app=express();

app.use(bodyParser.json())
app.use(cors());
const secretkey= 'SecRETE';

const USERS=[]

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
        jwt.verify(token, secretkey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
    // const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' }); In the provided code, the jwt.sign function from the jsonwebtoken library is used to create a JSON Web Token (JWT). Here's a breakdown of the code: This is use when we use mongoose or have a database 

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    console.log('Received data:', req.body); // Log received data
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
    }
    const userExist = USERS.find(user => user.username === username);
    if (userExist) {
        res.status(409).json({ message: "User already exists" });
    }
    else {
        const newUser = { username, password };
        USERS.push(newUser);
        const token = jsonwebtoken.sign({ username }, secretkey, { expiresIn: '1h' });
        res.json({ message: "User created", token });
        console.log(token);
    } 
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    console.log('Login attempt with:', req.body); // Log login attempt
    
    const existUser = USERS.find(user => user.username === username && user.password === password);

    if (existUser) {
        const token = jsonwebtoken.sign({ username }, secretkey, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
        console.log(token);
    } else {
        res.status(403).json({ message: "Invalid username or password" });
    }
});

const PORT=3000;
app.listen(PORT,()=>console.log(`server running on ${PORT}`));