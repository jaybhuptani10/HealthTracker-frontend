import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "./sleep.png";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosSync } from "react-icons/io";

const SleepStatus = () => {
  const [sleepQuality, setSleepQuality] = useState("Fetching...");
  const [loading, setLoading] = useState(true);

  // Default values for missing parameters
  const sleepDuration = 8; // hours
  const roomTemp = 21.5; // degrees Celsius

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
        );
        const sensorData = await response.json();

        // Get the latest sensor data object
        const latestData = sensorData.sensor_data[0]; // or sensorData[sensorData.length - 1]

        // Handle missing values
        const avgHeartRate = latestData?.PulseRate ?? 70; // Default to 70 BPM
        const oxygenLevel = latestData?.SPO2 ?? 98; // Default to 98%

        const payload = {
          avg_heart_rate: avgHeartRate,
          movement_count: 30,
          room_temp: roomTemp,
          sleep_duration: sleepDuration,
          oxygen_level: oxygenLevel,
        };

        // Step 2: Predict sleep quality
        const predictionResponse = await axios.post(
          "https://old-fitness-models.onrender.com/predict/sleep",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: false,
          }
        );

        const prediction = predictionResponse.data?.prediction || "Unknown";

        setSleepQuality((prev) => (prev !== prediction ? prediction : prev));
      } catch (error) {
        console.error("Error fetching sleep quality:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-white flex justify-between items-center p-2 rounded-3xl flex-col gap-2 relative">
      <div></div>
      <CiLocationArrow1 className="absolute right-3 top-3 bg-[#EAF1F3] rounded-xl h-8 p-1 w-8" />

      <img
        className="h-[40%] sm:h-[40%] sm:w-[45%] object-cover"
        src={img}
        alt="Sleep"
      />

      <div className="w-full flex flex-col gap-2 items-center p-2">
        <h1 className="w-full font-bold text-xl text-left">Sleep Status</h1>
        <div className="w-full flex gap-2 items-center">
          <h1 className="h-[10px] w-[10px] bg-green-600 rounded-full"></h1>
          {loading ? (
            <IoIosSync className="animate-spin text-gray-500" size={20} />
          ) : (
            <h1 className="text-gray-500">{sleepQuality}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepStatus;
