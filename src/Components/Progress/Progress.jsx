import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Progress.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

function Progress() {
  const [progress, setProgress] = useState([]);
  const [meals, setMeals] = useState([]);
  const [workout, setWorkout] = useState({
    selectedExercise: "",
    sets: "",
    reps: "",
    weight: "",
    date: getCurrentDate(),
  });
  const [meal, setMeal] = useState({
    selectedMeal: "",
    calories: "",
    date: getCurrentDate(),
  });

  const exercises = [
    "Squats",
    "Deadlift",
    "Bench Press",
    "Pull-ups",
    "Push-ups",
    "Lunges",
    "Overhead Press",
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // Function to fetch workouts from the backend
  const fetchWorkouts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5076/api/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      } else {
        console.error("Failed to fetch workouts");
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // Function to fetch meals from the backend
  const fetchMeals = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5076/api/meals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      } else {
        console.error("Failed to fetch meals");
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchWorkouts();
    fetchMeals();
  }, []);

  const handleWorkoutSelectChange = (e) => {
    setWorkout({ ...workout, selectedExercise: e.target.value });
  };

  const handleMealSelectChange = (e) => {
    setMeal({ ...meal, selectedMeal: e.target.value });
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    if (workout.selectedExercise && workout.sets && workout.reps && workout.weight) {
      const token = localStorage.getItem("token");
      console.log(token)
      try {
        const response = await fetch("http://localhost:5076/api/workouts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(workout),
        });
        if (response.ok) {
          // After a successful post, re-fetch workouts to update the chart.
          await fetchWorkouts();
          setWorkout({
            selectedExercise: "",
            sets: "",
            reps: "",
            weight: "",
            date: getCurrentDate(),
          });
        } else {
          console.error("Failed to log workout");
        }
      } catch (error) {
        console.error("Error logging workout:", error);
      }
    }
  };

  // Submit meal to backend
  const handleMealSubmit = async (e) => {
    e.preventDefault();
    if (meal.selectedMeal && meal.calories) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5076/api/meals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(meal),
        });
        if (response.ok) {
          // After a successful post, re-fetch meals to update the chart.
          await fetchMeals();
          setMeal({
            selectedMeal: "",
            calories: "",
            date: getCurrentDate(),
          });
        } else {
          console.error("Failed to log meal");
        }
      } catch (error) {
        console.error("Error logging meal:", error);
      }
    }
  };

  const workoutChartData = {
    labels: exercises,
    datasets: [
      {
        label: "Total Weight Lifted (kg)",
        data: exercises.map((exercise) => {
          const exerciseData = progress.filter(
            (entry) => entry.selectedExercise === exercise
          );
          return exerciseData.reduce(
            (acc, curr) => acc + (curr.sets * curr.reps * (curr.weight || 0)),
            0
          );
        }),
        backgroundColor: "#195594",
        borderColor: "#195594",
        borderWidth: 1,
      },
    ],
  };

  const mealChartData = {
    labels: mealTypes,
    datasets: [
      {
        label: "Total Calories",
        data: mealTypes.map((mealType) => {
          const mealData = meals.filter(
            (entry) => entry.selectedMeal === mealType
          );
          return mealData.reduce(
            (acc, curr) => acc + parseInt(curr.calories, 10),
            0
          );
        }),
        backgroundColor: "rgb(155, 209, 189)",
        borderColor: "rgb(155, 209, 189)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: { color: "rgba(255, 255, 255, 0.7)" },
      },
    },
    scales: {
      x: { ticks: { color: "#FFF" }, grid: { backgroundColor: "#FFF" } },
      y: { ticks: { color: "#FFF" }, grid: { backgroundColor: "#FFF" } },
    },
  };

  return (
    <div className="tracker-container">
      <h1>Gym Progress Tracker</h1>
      <div className="main-cont">
        <div className="progress-cont">
          {/* Workout Form */}
          <form onSubmit={handleWorkoutSubmit}>
            <div className="flex-space-between">
              <label>Select Exercise:</label>
              <select
                required
                value={workout.selectedExercise}
                onChange={handleWorkoutSelectChange}
              >
                <option value="">Select an exercise</option>
                {exercises.map((exercise, index) => (
                  <option key={index} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-space-between">
              <label>Sets:</label>
              <input
                type="number"
                name="sets"
                value={workout.sets}
                onChange={(e) =>
                  setWorkout({ ...workout, sets: e.target.value })
                }
                min={1}
                required
              />
            </div>
            <div className="flex-space-between">
              <label>Reps:</label>
              <input
                type="number"
                name="reps"
                value={workout.reps}
                onChange={(e) =>
                  setWorkout({ ...workout, reps: e.target.value })
                }
                min={1}
                required
              />
            </div>
            <div className="flex-space-between">
              <label>Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={workout.weight}
                onChange={(e) =>
                  setWorkout({ ...workout, weight: e.target.value })
                }
                min={1}
                required
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#195594", width: "100%" }}
            >
              Log Workout
            </button>
          </form>

          {/* Workout Bar Chart */}
          {progress.length > 0 && (
            <div className="chart-container">
              <h2>Workout Progress</h2>
              <Bar data={workoutChartData} options={chartOptions} />
            </div>
          )}
        </div>
        <div className="mal-cont">
          {/* Meal Form */}
          <form onSubmit={handleMealSubmit}>
            <div className="flex-space-between">
              <label>Select Meal:</label>
              <select
                value={meal.selectedMeal}
                required
                onChange={handleMealSelectChange}
              >
                <option value="">Select a meal</option>
                {mealTypes.map((mealType, index) => (
                  <option key={index} value={mealType}>
                    {mealType}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-space-between">
              <label>Calories:</label>
              <input
                type="number"
                name="calories"
                value={meal.calories}
                onChange={(e) =>
                  setMeal({ ...meal, calories: e.target.value })
                }
                min={1}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "rgb(155, 209, 189)",
                width: "100%",
              }}
            >
              Log Meal
            </button>
          </form>

          {/* Meal Bar Chart */}
          {meals.length > 0 && (
            <div className="chart-container">
              <h2>Meal Log</h2>
              <Bar data={mealChartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
