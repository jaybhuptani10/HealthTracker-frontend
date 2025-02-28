import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "./health.png";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosSync } from "react-icons/io";

const HealthStatus = () => {
  const [healthStatus, setHealthStatus] = useState("Fetching...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch sensor data
        const response = await fetch(
          "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
        );
        const sensorData = await response.json();
        const latestData = sensorData.sensor_data[0];

        // Handle missing values with defaults
        const heartRate = latestData?.PulseRate ?? 70; // Default 70 BPM
        const oxygenLevel = latestData?.SPO2 ?? 98; // Default 98%
        const temperature = latestData?.Temperature ?? 37; // Default 37°C

        const payload = {
          heart_rate: heartRate,
          temperature: temperature,
          oxygen_level: oxygenLevel,
        };

        // Predict health status
        const predictionResponse = await axios.post(
          "https://old-fitness-models.onrender.com/predict/health_status",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: false,
          }
        );

        const prediction = predictionResponse.data?.prediction || "Unknown";
        const status = ["Attention", "Fine"].includes(prediction)
          ? "Good"
          : "Critical";

        setHealthStatus("Good");
      } catch (error) {
        console.error("Error fetching health status:", error);
        setHealthStatus("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch every 30 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-white flex justify-between items-center p-2 rounded-3xl flex-col gap-2 relative">
      <div></div>
      <CiLocationArrow1 className="absolute right-3 top-3 bg-[#EAF1F3] rounded-xl h-8 p-1 w-8" />
      <img
        className="h-[40%] sm:h-[20%] sm:w-[45%] object-cover"
        src={img}
        alt="Health"
      />

      <div className="w-full flex flex-col gap-2 items-center p-2">
        <h1 className="w-full font-bold text-xl text-left">Health Status</h1>
        <div className="w-full flex gap-2 items-center">
          <h1
            className={`h-[10px] w-[10px] rounded-full ${
              healthStatus === "Good" ? "bg-green-600" : "bg-red-600"
            }`}
          ></h1>
          {loading ? (
            <IoIosSync className="animate-spin text-gray-500" size={20} />
          ) : (
            <h1 className="text-gray-500">{healthStatus}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthStatus;
