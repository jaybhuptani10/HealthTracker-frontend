import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
} from "recharts";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";
import { HeartPulse } from "lucide-react";

// API URL
const API_URL =
  "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData";

export default function HeartRateDashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [dailyHeartRate, setDailyHeartRate] = useState(null);
  const [minHeartRate, setMinHeartRate] = useState(null);
  const [maxHeartRate, setMaxHeartRate] = useState(null);
  const [heartRateHistory, setHeartRateHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch Sensor Data
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.sensor_data && data.sensor_data.length > 0) {
          // Filter out PulseRate === 0
          const validData = data.sensor_data.filter(
            (entry) => entry.PulseRate > 26
          );

          if (validData.length > 0) {
            const formattedData = validData.map((entry) => ({
              time: entry.DateTime.split(" ")[1], // Extract time part
              bpm: entry.PulseRate,
            }));

            setSensorData(validData);
            setHeartRateHistory(formattedData);

            // Update Daily Heart Rate Stats
            const pulseRates = validData.map((entry) => entry.PulseRate);
            setDailyHeartRate(pulseRates[pulseRates.length - 1]); // Latest pulse rate
            setMinHeartRate(Math.min(...pulseRates));
            setMaxHeartRate(Math.max(...pulseRates));
          }
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine Heart Rate Status
  const getHeartRateStatus = (bpm) => {
    if (bpm < 60) return { text: "Low", color: "text-blue-500" };
    if (bpm < 90) return { text: "Normal", color: "text-green-500" };
    return { text: "Elevated", color: "text-red-500" };
  };

  const status = dailyHeartRate ? getHeartRateStatus(dailyHeartRate) : null;

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Daily Heart Rate */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-3">
            <HeartPulse className="text-red-500" size={28} />
            <h2 className="text-xl font-semibold">Daily Heart Rate</h2>
          </div>

          <p className="text-3xl font-bold mt-2">
            {dailyHeartRate ? `${dailyHeartRate} bpm` : "Loading..."}
          </p>
          {status && (
            <p className={`text-sm font-semibold ${status.color}`}>
              {status.text}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Min: {minHeartRate || "-"} bpm • Max: {maxHeartRate || "-"} bpm
          </p>

          {/* Mini Line Graph */}
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={heartRateHistory}>
                <XAxis dataKey="time" hide />
                <YAxis domain={[50, 120]} hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bpm"
                  stroke="#E63946"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Heart Rate Line Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Heart Rate Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={heartRateHistory}>
              <XAxis dataKey="time" />
              <YAxis domain={[50, 120]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Calendar for Date Selection */}
      <Card>
        <CardContent>
          <Calendar
            mode="month"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </CardContent>
      </Card>

      {/* Monthly Heart Rate Bar Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Heart Rate Trend (Smoothed)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={heartRateHistory}>
              <XAxis dataKey="time" />
              <YAxis domain={[50, 120]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="bpm"
                stroke="#4F46E5"
                fill="#4F46E5"
                opacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
