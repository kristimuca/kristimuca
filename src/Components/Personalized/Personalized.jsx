import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap"; 
import './Personalized.css';

function Personalized() {
  const location = useLocation(); 
  const navigate = useNavigate();

  const { goal, workoutRoutine, mealPlan } = location.state;

  const workoutPlans = {
    "3-Day Plan": [
      "Day 1: Full Body Workout",
      "Day 2: Rest or Light Cardio",
      "Day 3: Full Body Workout"
    ],
    "4-Day Plan": [
      "Day 1: Upper Body Workout",
      "Day 2: Lower Body Workout",
      "Day 3: Rest or Light Cardio",
      "Day 4: Full Body Workout"
    ],
    "6-Day Plan": [
      "Day 1: Upper Body Workout",
      "Day 2: Lower Body Workout",
      "Day 3: Core & Cardio",
      "Day 4: Upper Body Workout",
      "Day 5: Lower Body Workout",
      "Day 6: Full Body Workout"
    ]
  };

  const mealPlans = {
    "3-Day Plan": [
      "Day 1: Chicken, Rice, Veggies",
      "Day 2: Salmon, Sweet Potatoes, Broccoli",
      "Day 3: Grilled Chicken, Quinoa, Salad"
    ],
    "4-Day Plan": [
      "Day 1: Chicken, Rice, Veggies",
      "Day 2: Beef, Sweet Potatoes, Salad",
      "Day 3: Grilled Chicken, Quinoa, Broccoli",
      "Day 4: Salmon, Avocado, Veggies"
    ],
    "6-Day Plan": [
      "Day 1: Chicken, Rice, Veggies",
      "Day 2: Beef, Sweet Potatoes, Salad",
      "Day 3: Grilled Chicken, Quinoa, Broccoli",
      "Day 4: Salmon, Avocado, Veggies",
      "Day 5: Turkey, Brown Rice, Salad",
      "Day 6: Chicken, Sweet Potatoes, Green Beans"
    ]
  };

  useEffect(() => {

    gsap.fromTo(
      ".personalized-container", 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" } 
    );

    gsap.fromTo(
      "h3", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" } 
    );

    gsap.fromTo(
      "h2", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" } 
    );
    
    gsap.fromTo(
      "h1", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" } 
    );

    gsap.fromTo(
      ".continue-button", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" } 
    );
  }, [location]); 
  return (
    <div className="personalized-container">        
      <div className="wrapper">
        <h1>Personalized Plan</h1>
        <div className="personalized-plan">
          <h2>Your Goal: {goal}</h2>
          <h3>Workout Plan: {workoutRoutine}</h3>
          <h3>Meal Plan: {mealPlan}</h3>
        </div>
        <div className="workout-routine">
          <h2>Workout Routine:</h2>
          <ul>
            {workoutPlans[workoutRoutine]?.map((day, index) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
        </div>

        <div className="meal-plan">
          <h2>Meal Plan:</h2>
          <ul>
            {mealPlans[mealPlan]?.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>
        </div>

        <button className="continue-button" onClick={() => navigate('/logged')}>Continue</button>

      </div>
    </div>
  );
}

export default Personalized;
