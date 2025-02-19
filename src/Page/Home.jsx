import React from "react";
import Navbar from "../components/Navbar";

import StepCounterComp from "../components/StepCounterComp";
import Weight from "../components/Weight";
import Calories from "../components/Calories";
import HeartRate from "../components/HeartRate";
import Facts from "../components/Facts";

const Home = () => {
  return (
    <div className="min-h-screen w-full p-10 flex ">
      <Navbar />
      <div className="sm:ml-10  h-screen w-full flex flex-col sm:flex-row gap-5 sm:gap-10 ">
        <div className="flex flex-col gap-[5%] w-full sm:w-[30%] h-[60%]">
          <div className="flex h-[40%]  gap-5">
            <Weight />
            <Calories />
          </div>
          <StepCounterComp />
        </div>
        <div className="h-[40vh] w-full  sm:h-[60%] sm:w-[45%]  ">
          <HeartRate />
        </div>
        <div className="h-[60%] w-full sm:w-[25%]  backdrop-blur-2xl rounded-3xl ">
          <Facts />
        </div>
      </div>
    </div>
  );
};

export default Home;
