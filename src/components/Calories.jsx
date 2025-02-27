import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, Tooltip, YAxis } from "recharts";

const API_URL = "https://old-fitness-models.onrender.com/predict/calories";

const Calories = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    { uv: 1848 },
    { uv: 1500 },
    { uv: 1600 },
    { uv: 2000 },
    { uv: 2200 },
    { uv: 1700 },
    { uv: 2000 },
  ]);
  const [latestCalories, setLatestCalories] = useState(1899);

  const userData = {
    gender: "male",
    age: 25,
    height: 180.0,
    weight: 75.0,
    duration: 30.0,
    heart_rate: 120.0,
    body_temp: 37.5,
  };

  useEffect(() => {
    const fetchCaloriePrediction = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (result.status === "success") {
          const predictedCalories = Math.round(result.prediction);
          setLatestCalories(predictedCalories);

          // Update data with new predicted value
          setData((prevData) => [
            ...prevData.slice(1),
            { uv: predictedCalories },
          ]);
        } else {
          console.error("Error fetching prediction:", result);
        }
      } catch (error) {
        console.error("Failed to fetch prediction:", error);
      }
    };

    fetchCaloriePrediction();
  }, []);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white text-xs px-2 py-1 rounded-md">
          {payload[0].value} cal
        </div>
      );
    }
    return null;
  };

  return (
    <div
      onClick={() => navigate("/caloriedashboard")}
      className="h-[100%] w-[50%] bg-[#ffffff] flex p-5 relative rounded-2xl cursor-pointer flex-col overflow-hidden"
    >
      <div>
        <h1 className="text-xl">Calories Burnt</h1>
      </div>
      <div className="h-full w-full flex flex-col sm:flex-row items-center gap-2">
        <LineChart width={80} height={50} data={data}>
          <YAxis domain={[1500, 2200]} hide />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="uv" stroke="#000" dot={true} />
        </LineChart>
        <h1 className="bg-white p-2 h-10 w-full sm:w-12 rounded-2xl text-md text-center leading-3 flex flex-row sm:flex-col items-center justify-center">
          {latestCalories}
          <span className="text-xs ml-0.5 mt-0.5 sm:ml-2 sm:mt-0">cal</span>
        </h1>
      </div>
    </div>
  );
};

export default Calories;
