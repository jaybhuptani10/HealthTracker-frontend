import React from "react";
import Navbar from "../components/Navbar";
import Stepcounter from "./Stepcounter";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import StepCounterComp from "../components/StepCounterComp";

const Home = () => {
  const data = [{ name: "Score", value: 75, fill: "#8884d8" }];
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
