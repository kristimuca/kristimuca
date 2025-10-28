import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock,  } from "react-icons/fa";
import './ForgotPass.css';
import logo from '../Assets/logo-transparent.png';




function ForgottPass(){
const navigate = useNavigate();
const handleForgot = (e) => {
    e.preventDefault();
    
    navigate('/')

};
return(
    <div className="container">
         <div className="logo-klip">
                        <img src={logo} alt="KlipFit Logo" className="logo"/>
                    </div>
   
<div className="wrapper">
    <form onSubmit={handleForgot}>
    <h1>Reset Password</h1>

  <div className="input-box">
                 <input type="text" placeholder="Username" required />
                 <FaUser className="icon" />
            </div>
      <div className="input-box">
                <input type="password" placeholder="Password" required />
                <FaLock className="icon"/>
            </div>
            <div className="input-box">
                            <input type="password" placeholder="Reset Password" required />
                            <FaLock className="icon"/>
                        </div>

            <button type="submit" className="submit-btn"> Confirm</button>


    </form>
</div>
</div>






);

}

export default ForgottPass;