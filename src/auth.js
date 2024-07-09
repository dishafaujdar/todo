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

const jwtToken = (user) => {
    const payload = { username: user.username };
    return jwt.sign(payload, secretkey, { expiresIn: '1h' });
};

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

app.post('/signup',(req,res)=>{
    const user=req.body;
    const userExist=USERS.find(u=> u.username === user.username)
    if(userExist){
        res.status(403).json({ message: "User already exists" });

    } else{
        USERS.push(user);
        const token=jwtToken(user);
        res.json({ message: "User created", token });
        console.log(token);
    }
});

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const existUser=USERS.find(u=>u.username === username && u.password === password);
    if(existUser){
        const token = jwtToken(user);
        res.json({ message: "Login successful", token });
        console.log(token)
    } else{
        res.status(403).json({ message: "Authentication failed" });
    }
});