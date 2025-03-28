import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import img from "./heart-3.png";

const HeartRate = () => {
  const [data, setData] = useState([]);
  const [latestDate, setLatestDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
      );
      const result = await response.json();

      if (result.sensor_data && Array.isArray(result.sensor_data)) {
        // Sort records by date (latest first)
        const sortedData = result.sensor_data.sort((a, b) => {
          const dateTimeA = new Date(
            a.DateTime.split(" ")[0].split("-").reverse().join("-") +
            " " +
            a.DateTime.split(" ")[1]
          );
          const dateTimeB = new Date(
            b.DateTime.split(" ")[0].split("-").reverse().join("-") +
            " " +
            b.DateTime.split(" ")[1]
          );
          return dateTimeB - dateTimeA; // Sort in descending order
        });

        // Find the latest available date with pulse data
        const latestRecord = sortedData.find((record) => record.PulseRate > 0);

        if (latestRecord) {
          const latestDateFormatted = latestRecord.DateTime.split(" ")[0]
            .split("-")
            .reverse()
            .join("-"); // Convert to "YYYY-MM-DD"
          setLatestDate(latestDateFormatted);

          // Filter records for the latest date
          const filteredData = sortedData
            .filter(
              (record) =>
                record.PulseRate > 35 &&
                record.DateTime.includes(latestRecord.DateTime.split(" ")[0])
            )
            .map((record) => ({
              time: record.DateTime.split(" ")[1], // Extract time (HH:mm:ss)
              bpm: record.PulseRate,
            }));

          setData(filteredData);
        } else {
          setData([]);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch heart rate data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-[50vh] sm:h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Display Latest Date */}
      {latestDate && (
        <div className="absolute top-5 left-5 bg-white p-2 rounded-md shadow-md">
          <p className="text-gray-600 font-semibold">
            Last Recorded Date: {latestDate}
          </p>
        </div>
      )}

      {/* Heart Image */}
      <img
        src={img}
        className="h-full w-full sm:w-[70%] object-cover"
        alt="Heart"
      />

      {/* Bottom Floating Card */}
      <div className="h-[35%] w-full absolute bottom-0 bg-white/70 rounded-2xl flex items-center justify-between px-4 overflow-hidden backdrop-blur-md">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Heart Rate</h1>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : data.length > 0 ? (
            <p className="text-sm text-gray-500">
              Latest: {data[data.length - 1].bpm} bpm
            </p>
          ) : (
            <p className="text-sm text-gray-500">No data available</p>
          )}
        </div>

        {/* Heartbeat-Style Line Chart */}
        <ResponsiveContainer width="80%" height="80%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide={false} />
            <YAxis hide={true} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bpm"
              stroke="#FF0000"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeartRate;
