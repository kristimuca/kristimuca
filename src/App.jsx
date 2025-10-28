import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import ForgottPass from "./Components/ForgotPass/ForgotPass.jsx";
import Logged from "./Components/Logged/Logged";
import Meal from "./Components/Meal/Meal";
import Workout from "./Components/Workout/Workout";
import GoalSelection from "./Components/GoalSelection/GoalSelection.jsx";
import Personalized from "./Components/Personalized/Personalized.jsx";
import Progress from "./Components/Progress/Progress.jsx";
import ProtectedRoute from "./routeProtection.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot" element={<ForgottPass />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/logged" element={<Logged />} />
          <Route path="/meal" element={<Meal />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/goal" element={<GoalSelection />} />
          <Route path="/personalized" element={<Personalized />} />
          <Route path="/progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
