// tsdr vtwi wglz tsto (password)
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Load environment variables from .env file
process.env.AUTH_EMAIL='idishafaujdar@gmail.com',
process.env.AUTH_PASSWORD='vbkr okfg dycv xhsn'

console.log('AUTH_EMAIL:', process.env.AUTH_EMAIL);
console.log('AUTH_PASSWORD:', process.env.AUTH_PASSWORD);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Transporter Verification Error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  if (!email) {
    return res.status(400).json({ status: 'FAILED', message: 'Email is required' });
  }

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Here's your OTP",
    html: `<p>Enter <b>${otp}</b> in your todo to continue with movies</p>`,
  };

  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      console.log("error",error)
    } else{
      console.log("send",info.response)
    }
  })

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      status: 'PENDING',
      message: 'EMAIL SENT',
      data: {
        email,
        otp,
      },
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      status: 'FAILED',
      message: 'Error sending OTP',
      error: error.message,
    });
  }
};

const verifyOtp= async (req, res) => {
  const { otp } = req.body;
  if (otp === otp) {
    res.status(200).json('OTP verified!');
    console.log({otp})
  } else {
    res.status(400).json('Invalid OTP!');
  }
};

app.post('/send-otp', sendOtp);
app.post('/verify-otp',verifyOtp)
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




