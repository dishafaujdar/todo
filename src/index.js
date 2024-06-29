import express from 'express';
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path:'./env'});
import cors from 'cors';
import validator from 'validator';

const app = express();
app.use(bodyParser.json());
app.use(cors());

let currentOTP;

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  } 
  currentOTP = Math.floor(100000 + Math.random() * 900000).toString();

const transporter = 
nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER_EMAIL_ID,
      pass: process.env.USER_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.USER_EMAIL_ID,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${currentOTP}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json('Error sending OTP');
    } else {
      console.log('OTP sent: ' + info.response);
      return res.status(200).json('OTP sent');
    }
  });

  app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;
    if (otp === currentOTP) {
      res.status(200).json('OTP verified!');
    } else {
      res.status(400).json('Invalid OTP!');
    }
  });

});
const PORT=3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
