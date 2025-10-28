import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Workout.css';

function Workout() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-background');
    return () => {
      document.body.classList.remove('no-background');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    navigate('/meal');
  };

  const goToProgress = (e) => {
      e.preventDefault();
      navigate('/progress');
  } ; 

  return (
    <div className="workout-wrapper">
        <div className="workout-header">
          <h1>Workout Plan 🧘🏻‍♀️</h1>
          <button type="button" onClick={handleSubmit}>Combine with Meal Plan 🍲</button>
          <button type="button" onClick={goToProgress}>Check progress 📈</button>
        </div>

        <p>Sore today, strong tomorrow</p>
        <div className="workout-planns">
          <div className="workout-planner">
            <h2>Full Body</h2>
            <div className="dayy-plan">
              <ul>
                <li><strong>Warm-Up: </strong> 5-10 min</li>
                <li><strong>Bodyweight Squats: </strong> 3 sets x 15 reps</li>
                <li><strong>Dumbbell Deadlifts: </strong> 3 sets x 10 reps</li>
                <li><strong>Jump Squats: </strong> 3 sets x 12 reps</li>
                <li><strong>Plank to Push-Up: </strong> 3 sets x 10 reps</li>
                <li><strong>Kettlebell Swings: </strong> 3 sets x 12 reps</li>
                <li><strong>Burpees: </strong> 3 sets x 10 reps</li>
                <li><strong>Cooldown: </strong> Stretching & Foam Rolling</li>
              </ul>
            </div>
          </div>

          <div className="workout-planner">
            <h2>Upper Body</h2>
            <div className="dayy-plan">
              <ul>
                <li><strong>Warm-Up: </strong> 5-10 min</li>
                <li><strong>Push-Ups: </strong> 3 sets x 12 reps</li>
                <li><strong>Dumbbell Shoulder Press: </strong> 3 sets x 10 reps</li>
                <li><strong>Biceps Curls: </strong> 3 sets x 12 reps</li>
                <li><strong>Triceps Dips: </strong> 3 sets x 12 reps</li>
                <li><strong>Russian Twists: </strong> 3 sets x 20 reps</li>
                <li><strong>Bicycle Crunches: </strong> 3 sets x 20 reps</li>
                <li><strong>Cooldown: </strong> Stretching & Foam Rolling</li>
              </ul>
            </div>
          </div>

          <div className="workout-planner">
            <h2>Lower Body</h2>
            <div className="dayy-plan">
              <ul>
                <li><strong>Warm-Up: </strong> 5-10 min</li>
                <li><strong>Squats: </strong> 3 sets x 12 reps</li>
                <li><strong>Lunges: </strong> 3 sets x 20 reps</li>
                <li><strong>Romanian Deadlifts: </strong> 3 sets x 12 reps</li>
                <li><strong>Hip Thrusts: </strong> 3 sets x 15 reps</li>
                <li><strong>Calf Raises: </strong> 3 sets x 12 reps</li>
                <li><strong>Leg Raises: </strong> 3 sets x 15 reps</li>
                <li><strong>Cooldown: </strong> Stretching & Foam Rolling</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="workout-planns">
          <div className="workout-planner">
            <h2>Light Cardio</h2>
            <div className="dayy-plan">
              <ul>
                <li><strong>Warm-Up: </strong> 5-10 min</li>
                <li><strong>Stationary Bike: </strong> 5 min</li>
                <li><strong>Rowing Machine: </strong> 5 min</li>
                <li><strong>Treadmill Walking: </strong> 30 min</li>
                <li><strong>Bodyweight Exercises: </strong> 5 min</li>
                <li><strong>Cooldown: </strong> Stretching & Foam Rolling</li>
              </ul>
            </div>
          </div>

          <div className="workout-planner">
            <h2>Core & Cardio</h2>
            <div className="dayy-plan">
              <ul>
                <li><strong>Warm-Up: </strong> 5-10 min</li>
                <li><strong>Bicycle Crunches: </strong> 3 x 25 reps</li>
                <li><strong>Plank: </strong> 1 min</li>
                <li><strong>Russian Twists: </strong> 3 x 20 reps</li>
                <li><strong>High Knees: </strong> 1 min</li>
                <li><strong>Cooldown: </strong> Stretching & Foam Rolling</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Workout;
