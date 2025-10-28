import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Meal.css';


function Meal() {
       const navigate = useNavigate();
         
               useEffect(()=>{
                   document.body.classList.add('no-background');
                   return() =>{
                       document.body.classList.remove('no-background');
                   };
               }, []);

       const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        navigate('/workout');

    };

    const goToProgress = (e) => {
        e.preventDefault();
        navigate('/progress');
    } ; 
    
    return(
<div className="meal-wrapper">
    <form action="">
        <div className="header">
        <h1 className="meal-header">Meal Planner 🥗</h1>
        <button type="button" onClick={handleSubmit}>Combine With Workout 🧘🏻‍♀️</button>
        <button type="button" onClick={goToProgress}>Check progress 📈</button>

        </div>
    
    <p>A Meal Planner designed with love and care for our gym girls. A healthy lifestyle is the path to a happy life.</p>
    
    <div className="meal-plans">
        <div className="meal-plan">
          
            <h2>3-Day Meal Plan </h2>
            <div className="day-plan">
                <h3>Day 1</h3>
                <ul>
                    <li><strong>Breakfast:</strong> Oatmeal with Fruits</li>
                    <li><strong>Lunch:</strong> Grilled Chicken With Salad</li>
                    <li><strong>Snack:</strong> Yogurt with Granola</li>
                    <li><strong>Dinner:</strong> Salmon with Veggies</li>
                </ul>
            </div>


            <div className="day-plan">
                <h3>Day 2</h3>
                <ul>
                    <li><strong>Breakfast:</strong> Scrambled Eggs and Avocado Toast</li>
                    <li><strong>Lunch:</strong> Quinoa Salad with Veggies</li>
                    <li><strong>Snack:</strong>  Fruit Smoothie</li>
                    <li><strong>Dinner:</strong> Chicken Stir Fry with Rice</li>
                </ul>
            </div>

            <div className="day-plan">
                <h3>Day 3</h3>
                <ul>
                    <li><strong>Breakfast:</strong> Chia Pudding with Berries</li>
                    <li><strong>Lunch:</strong> Turkey and Veggie Wrap</li>
                    <li><strong>Snack:</strong>  Hummus with Carrot Sticks</li>
                    <li><strong>Dinner:</strong> Grilled Fish with Sweet Potato</li>
                </ul>
            </div>

        </div>


        <div className="meal-plan">
            <h2>4-Day Meal Plan</h2>
            <div className="day-plan">
                <h3>Day 1</h3>
                <ul>
                    <li><strong>Breakfast:</strong> Oatmeal with Almond Butter</li>
                    <li><strong>Lunch:</strong> Chicken Caesar Salad</li>
                    <li><strong>Snack:</strong> Almonds and an Apple</li>
                    <li><strong>Dinner:</strong> Grilled Salmon with Quinoa</li>
                 </ul>
            </div>
            <div className="day-plan">
                <h3>Day 2</h3>
                <ul>
                    <li><strong>Breakfast:</strong> Avocado Toast with Eggs</li>
                    <li><strong>Lunch:</strong> Turkey and Avocado Wrap</li>
                    <li><strong>Snack:</strong> Greek Yogurt with Honey</li>
                    <li><strong>Dinner:</strong> Chicken Stir Fry with Veggies</li>
                 </ul>
            </div>

            <div className="day-plan">
                        <h3>Day 3</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Smoothie Bowl with Banana and Berries</li>
                            <li><strong>Lunch:</strong> Tuna Salad</li>
                            <li><strong>Snack:</strong> Hummus and Cucumber</li>
                            <li><strong>Dinner:</strong> Beef and Veggie Stir Fry</li>
                        </ul>
                    </div>

         <div className="day-plan">
                        <h3>Day 4</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Scrambled Eggs and Spinach</li>
                            <li><strong>Lunch:</strong> Grilled Veggie Salad</li>
                            <li><strong>Snack:</strong> Carrot Sticks with Guacamole</li>
                            <li><strong>Dinner:</strong> Grilled Chicken with Sweet Potato</li>
                        </ul>
                    </div>


        </div>


        <div className="meal-plan">
                    <h2>6-Day Meal Plan</h2>
                    <div className="day-plan">
                        <h3>Day 1</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Scrambled Eggs, Avocado Toast</li>
                            <li><strong>Lunch:</strong> Quinoa Salad with Chicken</li>
                            <li><strong>Snack:</strong> Almonds and Pear</li>
                            <li><strong>Dinner:</strong> Salmon with Roasted Vegetables</li>
                        </ul>
                    </div>
                    <div className="day-plan">
                        <h3>Day 2</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Smoothie with Spinach, Banana, and Almond Milk</li>
                            <li><strong>Lunch:</strong> Grilled Veggie Wrap</li>
                            <li><strong>Snack:</strong> Greek Yogurt with Fruit</li>
                            <li><strong>Dinner:</strong> Grilled Chicken with Roasted Sweet Potato</li>
                        </ul>
                    </div>
                    <div className="day-plan">
                        <h3>Day 3</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Chia Pudding with Berries</li>
                            <li><strong>Lunch:</strong> Turkey Sandwich</li>
                            <li><strong>Snack:</strong> Carrot Sticks with Hummus</li>
                            <li><strong>Dinner:</strong> Spaghetti with Marinara Sauce</li>
                        </ul>
                    </div>
                    <div className="day-plan">
                        <h3>Day 4</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Oatmeal with Banana</li>
                            <li><strong>Lunch:</strong> Tuna Salad</li>
                            <li><strong>Snack:</strong> Mixed Nuts</li>
                            <li><strong>Dinner:</strong> Grilled Shrimp with Quinoa</li>
                        </ul>
                    </div>
                    <div className="day-plan">
                        <h3>Day 5</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Scrambled Eggs with Veggies</li>
                            <li><strong>Lunch:</strong> Grilled Veggie Salad</li>
                            <li><strong>Snack:</strong> Protein Bar</li>
                            <li><strong>Dinner:</strong> Chicken Stir Fry</li>
                        </ul>
                    </div>
                    <div className="day-plan">
                        <h3>Day 6</h3>
                        <ul>
                            <li><strong>Breakfast:</strong> Avocado Toast with Eggs</li>
                            <li><strong>Lunch:</strong> Grilled Chicken Wrap</li>
                            <li><strong>Snack:</strong> Hummus with Veggies</li>
                            <li><strong>Dinner:</strong> Beef and Veggie Stir Fry</li>
                        </ul>
                    </div>
                </div>
    </div>

    
    </form>
    
</div>

    );

}

export default Meal;