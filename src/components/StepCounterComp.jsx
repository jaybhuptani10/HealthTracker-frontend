import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

import img from "./img.png";
const StepCounterComp = () => {
  const data = [{ name: "Score", value: 30, fill: "#8338EC" }];
  return (
    <div className="h-[30%] sm:h-[30%] w-full bg-[#EAF1F3] flex items-center justify-center relative rounded-2xl cursor-pointer">
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

      <h1 className="absolute text-4xl">8,000</h1>
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
