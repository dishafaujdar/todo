import React from "react";
import {useNavigate } from "react-router-dom";
import { useState } from "react";

const SendOtp=()=>{
    const Navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const mainpage=()=>{
        Navigate('/auth')
    }
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/send-otp', { email });
          setMessage(response.data);
        } catch (error) {
          setMessage(error.response ? error.response.data : 'Error sending OTP');
        }
      };
    
      const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/verify-otp', { otp });
          setMessage(response.data);
        } catch (error) {
          setMessage(error.response ? error.response.data : 'Error verifying OTP');
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
        <button type="submit" onClick={mainpage}>Verify OTP</button>
        </form>

        {message && <p>{message}</p>}
    </div>
    )
}
export default SendOtp;
