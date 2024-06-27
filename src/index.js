import express from 'express';
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer';

const app = express();
app.use(bodyParser.json());

let currentOTP;

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  currentOTP = Math.floor(100000 + Math.random() * 900000).toString();

const transporter = 
nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'idishafaujdar@gmail.com',
      pass: 'disha1102'
    }
  });

  const mailOptions = {
    from: 'idishafaujdar@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${currentOTP}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP');
    } else {
      console.log('OTP sent: ' + info.response);
      return res.status(200).send('OTP sent');
    }
  });

});

app.listen(5000, () => console.log('Server running on port 5000'));
