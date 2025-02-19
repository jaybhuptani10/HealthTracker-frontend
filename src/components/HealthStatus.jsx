import React from "react";
import img from "./health.png";
import { CiLocationArrow1 } from "react-icons/ci";
const HealthStatus = () => {
  return (
    <div className="h-full w-full bg-white  flex justify-between items-center p-2  rounded-3xl flex-col gap-2 relative">
      <div className=""></div>
      <CiLocationArrow1 className="absolute right-3 top-3 bg-[#EAF1F3] rounded-xl h-8 p-1 w-8" />
      <img
        className="h-[40%] sm:h-[30%] sm:w-[55%] object-cover "
        src={img}
        alt=""
      />
      <div className="w-full flex flex-col gap-2 items-center p-2">
        <h1 className="w-full font-bold text-xl text-left">Health Status</h1>
        <div className="w-full flex gap-2 items-center">
          <h1 className="h-[10px] w-[10px] bg-green-600 rounded-full"></h1>
          <h1 className="text-gray-500">Normal</h1>
        </div>
      </div>
    </div>
  );
};

export default HealthStatus;
