import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Goal.css';

function Logged() {
       const navigate = useNavigate();
    
        useEffect(()=>{
            return() =>{
            };
        }, []);
          
    const handleMealClick = (e) => {
        e.preventDefault();
        navigate('/meal');
    }
    const handleWorkoutClick = (e) => {
        e.preventDefault();
         navigate('/workout');
    }
        
return(
    <div className="container">
            <h1>What is your GOAL?</h1>

            <div>
                <div className="item" onClick={handleWorkoutClick}>
                    <span></span>
                    <span>Lose Full-Body Weight</span>
                </div>

                <div className="item">
                    <span></span>
                    <span>Burn Belly Fat</span>
                </div>

                <div className="item">
                    <span></span>
                    <span>Get Strong & Lean</span>
                </div>
            </div>
    
    </div>
);

}

export default Logged;