import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SendOtp from "../../../level1/Sendotp";
import Signup from "./level2/Signup";
import Login from "./level2/Login";
import Authpg from "./level2/Newauthpg";  
import Newtodo from "./level2/Newtodo";
import Profile from "./level2/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/sendOtp" element={<SendOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newtodo" element={<Newtodo />} />
        <Route path="/newauth" element={<Authpg />} />
        <Route path="/newAuthpg" element={<Authpg />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
