import React from "react";
import Navbar from "../components/Navbar";

import StepCounterComp from "../components/StepCounterComp";
import Weight from "../components/Weight";
import Calories from "../components/Calories";
import HeartRate from "../components/HeartRate";

const Home = () => {
  return (
    <div className="min-h-screen w-full p-10 flex">
      <Navbar />
      <div className="ml-10  h-screen w-full flex gap-10 ">
        <div className="flex flex-col gap-[5%] w-[30%] h-[60%]">
          <div className="flex h-[40%]  gap-5">
            <Weight />
            <Calories />
          </div>
          <StepCounterComp />
        </div>
        <div className="h-[60%] w-[45%] overflow-hidden">
          <HeartRate />
        </div>
        <div className="h-[60%] w-[25%] "></div>
      </div>
    </div>
  );
};

export default Home;
