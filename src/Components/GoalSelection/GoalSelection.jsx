import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './GoalSelection.css';
import logo from '../Assets/logo-transparent.png';


function GoalSelection(){

    const navigate = useNavigate();

  const [goal, setGoal] = useState('');
    const[workoutRoutine,setWorkoutRoutine]=useState('');
    const[mealPlan,setMealPlan]=useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        
        navigate('/personalized',{state:{goal,workoutRoutine,mealPlan}});

    };


    return(
        <div className="container">
                    <div className="logo-klip">
                        <img src={logo} alt="KlipFit Logo" className="logo"/>
                    </div>
        <div className="wrapper">
            <h1>Select Your Fitness Goals</h1>
            <form onSubmit={handleSubmit} className="goal-selection-form">
                <div>
                    <label>Goal:</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
                        <option value="">Select your Goal</option>
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Gain Muscle">Gain Muscle</option>
                        <option value="Stay Fit">Stay Fit</option>
                    </select>
                </div>

                <div>
                    <label>Workout Plan:</label>
                    <select value={workoutRoutine} onChange={(e) => setWorkoutRoutine(e.target.value)} required>
                        <option value="">Workout Plan</option>
                        <option value="3-Day Plan">3-Day Plan</option>
                        <option value="4-Day Plan">4-Day Plan</option>
                        <option value="6-Day Plan">6-Day Plan</option>
                    </select>
                </div>


                <div>
                    <label>Meal Plan:</label>
                    <select value={mealPlan} onChange={(e) => setMealPlan(e.target.value)} required>
                        <option value="">Meal Plan</option>
                        <option value="3-Day Plan">3-Day Plan</option>
                        <option value="4-Day Plan">4-Day Plan</option>
                        <option value="6-Day Plan">6-Day Plan</option>
                    </select>
                </div>

             <button type="submit">Generate Plans</button>


            </form>

        </div>
        </div>
    );
};
export default GoalSelection;