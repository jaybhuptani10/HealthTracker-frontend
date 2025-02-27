import React, { useState, useEffect } from "react";

const Sleep = () => {
  const [sleepDuration, setSleepDuration] = useState(null);
  const [error, setError] = useState(null);

  // 🔹 Instead of user selecting, we set a fixed date: 22 Feb 2025
  const selectedDate = "2025-02-21";

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await fetch(
          "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
        );
        const data = await response.json();

        if (
          !data ||
          !Array.isArray(data.sensor_data) ||
          data.sensor_data.length === 0
        ) {
          throw new Error("Invalid or empty sleep data.");
        }

        const sensorData = data.sensor_data;

        // 🕒 Function to convert "DD-MM-YYYY HH:mm:ss" to Date object
        const parseDate = (dateString) => {
          const [day, month, year, time] = dateString.split(/[- ]/);
          return new Date(`${year}-${month}-${day}T${time}`);
        };

        // 🔍 Filter data for the **fixed date (22 Feb 2025)**
        const filteredData = sensorData.filter((entry) => {
          const entryDate = parseDate(entry.DateTime)
            .toISOString()
            .split("T")[0];
          return entryDate === selectedDate;
        });

        if (filteredData.length === 0) {
          throw new Error(`No sleep data available for ${selectedDate}`);
        }

        // 🩺 Define sleep threshold (e.g., below 65 BPM = sleeping)
        const sleepThreshold = 95;
        const sleepEntries = filteredData.filter(
          (entry) => entry.PulseRate < sleepThreshold
        );

        if (sleepEntries.length === 0) {
          throw new Error(`No sleep detected on ${selectedDate}`);
        }

        // Get sleep start and end times
        const sleepStart = parseDate(sleepEntries[0].DateTime);
        const sleepEnd = parseDate(
          sleepEntries[sleepEntries.length - 1].DateTime
        );

        // console.log("Sleep Start:", sleepStart);
        // console.log("Sleep End:", sleepEnd);

        // ⏳ Calculate sleep duration
        const durationMs = sleepEnd - sleepStart;
        const durationHours = (durationMs / (1000 * 60 * 60)).toFixed(2); // Convert ms to hours

        setSleepDuration(durationHours * -1);
        setError(null);
      } catch (error) {
        console.error("Error fetching sleep data:", error);
        setSleepDuration(null);
        setError(error.message);
      }
    };

    fetchSleepData();
  }, []);

  return (
    // <div className="h-full w-full flex flex-col items-center p-5">
    //   <h1 className="text-blue-950 font-bold">Sleep Data (Pulse-Based)</h1>

    //   {/* 📌 Removed date picker, using a fixed date instead */}
    //   <h3 className="text-gray-600">Analyzing sleep for: {selectedDate}</h3>

    //   {sleepDuration ? (
    //     <h3 className="text-green-600 font-bold">
    //       Total Sleep Duration: {sleepDuration} hours
    //     </h3>
    //   ) : (
    //     <h3>Loading...</h3>
    //   )}

    //   {error && <p className="text-red-600">Error: {error}</p>}
    // </div>

    <div className="h-full w-full  flex justify-between px-10 items-center ">
      <div className="flex flex-col items-center p-2 leading-5">
        <h1 className="text-blue-950 font-bold">Sleep Time</h1>
        <h3 className="text-gray-500">{sleepDuration}</h3>
      </div>
      <div className="w-56 flex items-center justify-center bg-white h-10 rounded-2xl p-2">
        <div className=" w-[50%] h-8 bg-blue-700 flex items-center justify-center rounded-2xl text-white">
          <h1>00:30-08:00</h1>
        </div>
      </div>
    </div>
  );
};

export default Sleep;
