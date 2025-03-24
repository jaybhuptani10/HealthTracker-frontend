import React from "react";
import Home from "./Page/Home";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import FitnessDashboard from "./Page/FitnessDashboard";
import StepsDashboard from "./Page/StepsDashboard";
import Navbar from "./components/Navbar";
import axios from "axios";
import ChatBot from "./components/chatbot";

// axios.defaults.baseURL =
//   "http://localhost:4000/" || "https://health-tracker-backend-jet.vercel.app/";
axios.defaults.baseURL = "https://health-tracker-backend-jet.vercel.app/";
// axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="min-h-screen w-full px-10 sm:px-20 flex">
      <Navbar />
      <Outlet />
      <ChatBot />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/steps" element={<StepsDashboard/>} />
    //   </Routes>
    // </BrowserRouter>
  );
};

export default App;
