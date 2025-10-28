import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Logged.css';
import { gsap } from "gsap"; 



function Logged() {
       const location = useLocation();
       const navigate = useNavigate();

       const quotes = ["Put it in the waste-not on your waist","You are what you eat", "Don't wish for it, work for it", "Stay hydrated", "You are stronger than you think", "Challenge your limits", "Don't watch the clock, do what it does", "Just for the health of it"];
       const[quote, setQuote] = useState("");
       useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);

        return() => setQuote("");
        
       }, []);
    
        useEffect(()=>{
            gsap.fromTo(
                ".btn-container button", 
                { x: -500, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.3, easeParams: [1.5, 0.5] } 
              );
          
              gsap.fromTo(
                ".motivation-quote", 
                { opacity: 0, y: -50 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" } 
              );
          
        }, [location]);
          
        const handleHover = (e) => {
            gsap.to(e.target, { scale: 1.1, duration: 0.3, ease: "power2.out" });
          };
        
          const handleHoverOut = (e) => {
            gsap.to(e.target, { scale: 1, duration: 0.3, ease: "power2.out" });
          };
        
    const handleMealClick = (e) => {
        e.preventDefault();
        navigate('/meal');
    }
    const handleWorkoutClick = (e) => {
        e.preventDefault();
         navigate('/workout');
    }
        
return(
    <div className="logged-wraper">
            <h1>KLIP FIT Family</h1>

            <div className="quote">
                <p className="motivation-quote">{quote}</p>
            </div>

            <div className="btn-container">
                   <div>
                   <button className="workouts-btn" type="button" onClick={handleWorkoutClick} 
                   onMouseEnter={handleHover} 
                   onMouseLeave={handleHoverOut}
                   >
                    Workout 🏋🏻‍♀️</button>
                   
                   </div>

                   <div>
                   <button className="meals-btn" type="button" onClick={handleMealClick} 
                   onMouseEnter={handleHover} 
                   onMouseLeave={handleHoverOut}
                   >
                    Meal 🥗</button>
                   
                   </div>

                </div>


            <p className="description">
                KLIP FIT is your go-to platform for achieving your fitness goals.
                 We provide our girls with the best workout routines and meal plans to help them stay fit and healthy, all in once.
                 It's never too late to start your fitness journey.
                 Let's get started!
            </p>

              
            

    
    </div>
);

}

export default Logged;