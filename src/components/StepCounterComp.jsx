import React, { useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

import img from "./img.png";
import { useLocation } from "react-router-dom";

const StepCounterComp = ({ sensorData }) => {
  // const data = [{ name: "Steps", value: 30, fill: "#8338EC" }];
  console.log(sensorData);

  function sumStepsForDate(sensorData, targetDate) {
    if (!sensorData.length) return 0;

    // Sum steps for the given target date, ensuring steps exist
    let totalSteps = sensorData.reduce((sum, data) => {
      let currentDate = data.DateTime.split(" ")[0];
      return currentDate === targetDate && data.Steps !== undefined
        ? sum + data.Steps
        : sum;
    }, 0);

    return totalSteps;
  }

  const today = new Date()
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");
  const steps = sumStepsForDate(sensorData, today);
  const data = [{ name: "Steps", value: steps / 100, fill: "#8338EC" }];

  console.log(sumStepsForDate(sensorData, "26-02-2025"));

  return (
    <div className="h-[100%] w-full bg-[#ffffff] flex items-center justify-center relative rounded-2xl cursor-pointer">
      <RadialBarChart
        className="absolute"
        width={500}
        height={400}
        cx={250}
        cy={230}
        innerRadius={170}
        outerRadius={180}
        startAngle={220}
        endAngle={-40}
        barSize={15}
        data={data}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          minAngle={15}
          background={{ fill: "#DCE2E5" }}
          clockWise
          dataKey="value"
        />
      </RadialBarChart>

      <h1 className="absolute text-4xl">{steps}</h1>
      <span className="absolute text-xl text-gray-500 mt-16">Steps</span>
      <h1 className="absolute bottom-10 text-xl text-gray-500">10,000 steps</h1>

      {/* <img
        src={img}
        className="h-full object-cover w-full absolute top-0 left-0"
        alt=""
      /> */}
    </div>
  );
};

export default StepCounterComp;
