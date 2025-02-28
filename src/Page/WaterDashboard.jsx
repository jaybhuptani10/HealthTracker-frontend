import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Progress } from "../components/ui/Progress.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";

const generateDummyWaterData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {};
  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => ({
      day: `Day ${day + 1}`,
      date: new Date(2025, months.indexOf(month), day + 1).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      ),
      ounces: Math.floor(Math.random() * 80) + 20, // Random water intake between 20-100 ounces
    }));
  });
  return data;
};

const dummyWaterData = generateDummyWaterData();

const getWeekData = (selectedDate, monthData) => {
  const dayIndex = selectedDate.getDate() - 1;
  const startIndex = Math.max(0, dayIndex - 6);
  return monthData.slice(startIndex, dayIndex + 1);
};

export default function WaterIntakeDashboard() {
  const [goal, setGoal] = useState(64); // Default goal: 64 ounces (8 cups)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyIntake, setDailyIntake] = useState(0);
  const [monthlyAverage, setMonthlyAverage] = useState(0);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getWaterData"
        );
        const data = await response.json();

        if (!data || !data.water_data || data.water_data.length === 0) {
          throw new Error("No water data available.");
        }

        setSensorData(data.water_data);
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    fetchSensorData();
  }, []);

  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyWaterData[month] || [];

    // Get data for the specific selected day
    const dayIndex = selectedDate.getDate() - 1;
    const dayData =
      dayIndex >= 0 && dayIndex < monthData.length ? monthData[dayIndex] : null;

    // Get week data for the chart
    const weekData = getWeekData(selectedDate, monthData);
    setWeeklyData(weekData);

    // Update water intake for the selected day
    if (dayData) {
      setDailyIntake(dayData.ounces);
    }

    // Calculate monthly average
    setMonthlyAverage(
      monthData.reduce((sum, entry) => sum + entry.ounces, 0) / monthData.length
    );

    // If we have sensor data, try to use it
    if (sensorData.length > 0) {
      const formattedDate = selectedDate
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");

      const intake = sumWaterForDate(sensorData, formattedDate);
      if (intake > 0) {
        setDailyIntake(intake);
      }
    }
  }, [selectedDate, sensorData]);

  function sumWaterForDate(sensorData, targetDate) {
    if (!sensorData.length) return 0;

    // Sum water intake for the given target date, ensuring intake exists
    let totalIntake = sensorData.reduce((sum, data) => {
      let currentDate = data.DateTime.split(" ")[0];
      return currentDate === targetDate && data.WaterIntake !== undefined
        ? sum + data.WaterIntake
        : sum;
    }, 0);

    return totalIntake;
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Convert ounces to cups for display
  const ouncesToCups = (ounces) => {
    return (ounces / 8).toFixed(1);
  };

  return (
    <div className="p-6 sm:px-20 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Daily Water Intake */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">
            Daily Water Intake for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </h2>
          <p className="text-3xl font-bold">{dailyIntake} oz</p>
          <p className="text-lg">{ouncesToCups(dailyIntake)} cups</p>
          <Progress value={(dailyIntake / goal) * 100} className="mt-2" />
          <p className="text-sm text-gray-500">
            Goal: {goal} oz ({ouncesToCups(goal)} cups)
          </p>
        </CardContent>
      </Card>

      {/* Monthly Average */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Monthly Average</h2>
          <br />
          <p className="text-3xl font-bold">{Math.floor(monthlyAverage)} oz</p>
          <p className="text-lg">
            {ouncesToCups(Math.floor(monthlyAverage))} cups
          </p>
        </CardContent>
      </Card>

      {/* Set Water Goal */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Set Your Goal</h2>
          <br />
          <input
            type="number"
            className="mt-2 border p-1 w-full"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
          />
          <p className="text-sm text-gray-500 mt-1">
            Ounces ({ouncesToCups(goal)} cups)
          </p>
        </CardContent>
      </Card>

      {/* Line Graph for Weekly Water Intake */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Weekly Water Intake</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${value} oz (${ouncesToCups(value)} cups)`,
                  "Water",
                ]}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="ounces"
                stroke="#2563EB"
                strokeWidth={2}
                name="Water Intake"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent>
          <Calendar selected={selectedDate} onSelect={handleDateSelect} />
        </CardContent>
      </Card>

      {/* Bar Chart for Monthly Water Intake */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Monthly Water Intake</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={
                dummyWaterData[
                  selectedDate.toLocaleString("default", { month: "short" })
                ] || []
              }
            >
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${value} oz (${ouncesToCups(value)} cups)`,
                  "Water",
                ]}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="ounces" fill="#2563EB" name="Water Intake" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Add Water */}
      <Card className="col-span-1 md:col-span-3">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Quick Add Water</h2>
          <div className="flex flex-wrap gap-4">
            {[8, 16, 24, 32].map((amount) => (
              <button
                key={amount}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-full"
                onClick={() =>
                  setDailyIntake(Math.min(dailyIntake + amount, 200))
                }
              >
                +{amount} oz ({ouncesToCups(amount)} cups)
              </button>
            ))}
            <button
              className="bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-full"
              onClick={() => setDailyIntake(Math.max(dailyIntake - 8, 0))}
            >
              -8 oz (1 cup)
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
