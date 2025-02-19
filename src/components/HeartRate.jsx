import React, { useEffect, useState } from "react";
import { LineChart, Line, YAxis, XAxis, ResponsiveContainer } from "recharts";
import img from "./heart-2.png";

const HeartRate = () => {
  const [data, setData] = useState([]);

  // Function to generate heartbeat-like data (sine wave)
  const generateHeartbeatData = () => {
    const dataPoints = [];
    for (let i = 0; i < 200; i++) {
      // Simulate sine wave for heartbeat
      dataPoints.push({
        bpm: Math.sin(i * 0.2) * Math.cos(i * 0.5) * 50 + 100,
      });
    }
    return dataPoints;
  };

  useEffect(() => {
    // Generate and update the heartbeat data
    setData(generateHeartbeatData());

    // Optional: Update data periodically if you want to animate it over time
    const interval = setInterval(() => {
      setData(generateHeartbeatData());
    }, 100); // Update every 100ms

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Heart Image */}
      <img src={img} className="h-full w-[100%] object-cover" alt="Heart" />

      {/* Bottom Floating Card */}
      <div className="h-[25%] w-full absolute bottom-0 bg-white/70 rounded-2xl shadow-lg flex items-center justify-between px-4 overflow-hidden backdrop-blur-md">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Heart Rate</h1>
          <p className="text-sm text-gray-500">124 bpm</p>
        </div>

        {/* Heartbeat-Style Line Chart */}
        <ResponsiveContainer width="80%" height="80%">
          <LineChart data={data}>
            <YAxis hide={true} />
            <XAxis hide={true} />
            <Line
              type="monotone"
              dataKey="bpm"
              stroke="#FF0000" // Red color for heartbeat line
              strokeWidth={2}
              dot={false} // No dots on the line
              fill="none" // No fill area
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeartRate;
