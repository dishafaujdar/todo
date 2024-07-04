import React from "react";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const SendOtp=()=>{
    // const Navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    // const mainpage=()=>{
    //     Navigate('/auth')
    // }
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/send-otp', { email });
          console.log("send data:",response.data);
          setMessage(response.data.message);
        } catch (error) {
          console.log("error:",error.response ? error.response.data :'Error sending otp')
          setMessage(error.response ? error.response.data.message : 'Error sending OTP');
        }
      };
    
      const handleVerifyOtp = async (e) => {
        e.preventDefault();
        console.log('Verifying OTP:', otp); 
        try {
          const response = await axios.post('http://localhost:3000/verify-otp', { email,otp });
          console.log("verify otp response",response.data)
          if(response.data.success){
            setMessage(response.data.message)
            window.open('https://www.netflix.com', '_blank');
            // Navigate('https://www.netflix.com/browse');
          } else {
            console.log("wrong otp");
            setMessage(response.data.message);
        }
        } catch (error) {
          console.log('error:', error.response ? error.response.data: 'error verifying otp');
          setMessage(error.response ? error.response.data.message : 'Error verifying OTP');
        }
      };
    return(
        <div>
        <h1>Send OTP</h1>
        <form onSubmit={handleSendOtp}>
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />  
        <button type="submit">Send OTP</button>
        </form>

    <h1>Verify OTP</h1>
        <form onSubmit={handleVerifyOtp}>
        <label htmlFor="otp">OTP:</label>
        <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
        />
        <button type="submit">Verify OTP</button> 
        {/* add if else */}
        </form>

        {message && <p>{message}</p>}
    </div>
    )
}
export default SendOtp;
