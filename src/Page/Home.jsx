import React from "react";
import Navbar from "../components/Navbar";
import Stepcounter from "./Stepcounter";

import StepCounterComp from "../components/StepCounterComp";

const Home = () => {
  return (
    <div className="min-h-screen w-full p-10 flex">
      <Navbar />
      <div className="ml-10">
        <StepCounterComp />
      </div>
    </div>
  );
};

export default Home;
