import React from "react";
import Home from "./Page/Home";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import FitnessDashboard from "./Page/FitnessDashboard";
import StepsDashboard from "./Page/StepsDashboard";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <div className="min-h-screen w-full p-10 flex">
      <Navbar />
      <Outlet/>
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
