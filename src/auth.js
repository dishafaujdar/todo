import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
// import {User} from './models/user.models.js'
// import {TODO} from './models/todo.models.js'
const app=express();

app.use(bodyParser.json())

const secretkey= 'SecRETE';

const USERS=[]

// const jwtToken = (user) => {
//     const payload = { username: user.username };
//     return jwt.sign(payload, secretkey, { expiresIn: '1h' });
// };

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

app.post('/signup', async (req,res)=>{
    const {username,password}=req.body;
    const userExist= await USERS.findOne({username})
    if(userExist){
        res.status(403).json({ message: "User already exists" });

    } else{
        const newUser= new USERS.push(username,password);
        await newUser.save();
        const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' });   //In the provided code, the jwt.sign function from the jsonwebtoken library is used to create a JSON Web Token (JWT). Here's a breakdown of the code:
        res.json({ message: "User created", token });
        console.log(token);
    }
});

app.post('/login', async (req,res)=>{
    const {username,password}=req.headers;
    const existUser= await USERS.findOne({username,password});
    if(existUser){
        const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' }); 
        res.json({ message: "Login successful", token });
        console.log(token)
    } else{
        res.status(403).json({ message: "Authentication failedInvalid username or password " });
    }
});

const PORT=3000;
app.listen(PORT,()=>console.log(`server running on ${PORT}`));