import React, { useEffect, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StepCounterComp from "../components/StepCounterComp";
import Weight from "../components/Weight";
import Calories from "../components/Calories";
import HeartRate from "../components/HeartRate";
import Facts from "../components/Facts";
import HealthStatus from "../components/HealthStatus";
import SleepStatus from "../components/SleepStatus";
import Sleep from "../components/Sleep";
import O2 from "../components/O2";
import BMI from "../components/BMI";
import HydrationTracker from "../components/HydrationTracker";

const Home = () => {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
        );
        const data = await response.json();

        if (!data || !data.sensor_data || data.sensor_data.length === 0) {
          throw new Error("No sensor data available.");
        }

        setSensorData(data.sensor_data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  return (
    <div className="min-h-screen w-full p-10 flex">
      <div className="sm:ml-10 h-screen w-full flex flex-col sm:flex-row gap-5 sm:gap-8 mb-10">
        <div className="flex flex-col gap-5 w-full sm:w-[30%] min-h-[100vh] sm:min-h-[120vh]">
          <div className="flex h-[30%] sm:h-[20%] gap-5">
            <Weight />
            <Calories />
          </div>
          <div className="h-[30%] sm:h-[30%] w-full relative">
            <CiLocationArrow1
              onClick={() => navigate("/steps")}
              className="absolute right-3 top-3 z-50 rounded-xl h-8 p-1 w-8 cursor-pointer"
            />
            <StepCounterComp sensorData={sensorData} />
          </div>
          <div className="h-[30vh] sm:h-[50vh] w-full sm:w-[100%] flex gap-2">
            <HealthStatus sensorData={sensorData} />
            <SleepStatus sensorData={sensorData} />
          </div>
        </div>
        <div className="w-full flex gap-5 min-h-[100vh] sm:min-h-[105vh] flex-col">
          <div className="flex sm:flex-row flex-col gap-2 h-full w-full items-center justify-center">
            <HeartRate sensorData={sensorData} />
            <Facts />
          </div>
          <div className="w-full border-2 border-gray-400 h-fit sm:min-h-[50vh] mt-6 rounded-3xl">
            <div className="h-80% w-full flex-col sm:flex-row flex gap-2 p-3">
              <div className="h-[30vh] w-full rounded-2xl sm:w-[33.33%] bg-[#fff]">
                <O2 sensorData={sensorData} />
              </div>
              <div className="h-[30vh] rounded-2xl w-full sm:w-[33.33%] bg-[#fff]">
                <BMI sensorData={sensorData} />
              </div>
              <div className="h-[30vh] rounded-2xl w-full sm:w-[33.33%] bg-[#fff]">
                <HydrationTracker sensorData={sensorData} />
              </div>
            </div>
            <div className="h-auto p-3">
              <div className="h-auto rounded-3xl w-full border-2 border-gray-400">
                <Sleep sensorData={sensorData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
