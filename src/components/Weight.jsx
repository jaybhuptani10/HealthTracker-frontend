import React from "react";
import { LineChart, Line, Tooltip, YAxis } from "recharts";

const Weight = () => {
  const data = [
    { uv: 92 },
    { uv: 90.5 },
    { uv: 91.8 },
    { uv: 90 },
    { uv: 92.3 },
    { uv: 89.7 },
    { uv: 91.5 },
  ];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white text-xs px-2 py-1 rounded-md">
          {payload[0].value} kg
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[100%] w-[50%] bg-[#ffffff] flex p-5 relative rounded-2xl cursor-pointer flex-col overflow-hidden">
      <div>
        <h1 className="text-xl">Weight</h1>
        <span className="text-sm text-gray-500 mt-6">Lost 4Kg</span>
      </div>
      <div className="h-full w-full flex flex-col sm:flex-row  items-center gap-2 ">
        <LineChart width={80} height={50} data={data}>
          <YAxis domain={[91, 93]} hide />{" "}
          {/* Adjust Y-Axis to control up-down range */}
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="uv" stroke="#000" dot={true} />
        </LineChart>
        <h1 className="bg-white p-2 h-10 w-full sm:w-12 rounded-2xl text-md text-center leading-3 flex flex-row sm:flex-col items-center justify-center">
          90 <span className="text-xs ml-0.5 mt-0.5 sm:ml-2 sm:mt-0">kg</span>
        </h1>
      </div>
    </div>
  );
};

export default Weight;
