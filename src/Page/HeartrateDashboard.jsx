import React, { useState, useEffect } from "react";

const Sleep = () => {
  const [sleepData, setSleepData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await fetch(
          "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
        );
        const data = await response.json(); // 🔹 Manually parse JSON

        console.log("API Response:", data); // Debugging response

        if (
          data &&
          Array.isArray(data.sensor_data) &&
          data.sensor_data.length > 0
        ) {
          const latestSensorData = data[0];
          setSleepData(latestSensorData);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (error) {
        console.error("Error fetching sleep data:", error);
        setError(error.message);
      }
    };

    fetchSleepData();
  }, []);

  return (
    <div className="h-full w-full flex justify-between px-10 items-center">
      <div className="flex flex-col items-center p-2">
        <h1 className="text-blue-950 font-bold">Sleep Data</h1>
        {sleepData ? (
          <>
            <h3>Heart Rate: {sleepData.PulseRate} BPM</h3>
            <h3>SPO2: {sleepData.SPO2}%</h3>
            <h3>Temperature: {sleepData.Temperature}°C</h3>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default Sleep;
