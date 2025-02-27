import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Progress } from "../components/ui/Progress.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";
const generateDummyData = () => {
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
  let baseWeight = 70;

  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => {
      const weight = baseWeight + (Math.random() * 2 - 1);
      baseWeight += Math.random() * 0.1 - 0.05;
      return {
        day: `Day ${day + 1}`,
        date: new Date(2025, months.indexOf(month), day + 1).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        ),
        weight: Number(weight.toFixed(1)),
        weightLoss: Number((Math.random() * 0.4 - 0.2).toFixed(1)),
      };
    });
  });
  return data;
};

const dummyData = generateDummyData();

const getWeekData = (selectedDate, monthData) => {
  const dayIndex = selectedDate.getDate() - 1;
  const startIndex = Math.max(0, dayIndex - 6);
  return monthData.slice(startIndex, dayIndex + 1);
};

// Custom tooltip component for the weight change graph
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <p className="text-sm font-semibold">{payload[0].payload.date}</p>
        <p className="text-sm">
          Change: {payload[0].value > 0 ? "+" : ""}
          {payload[0].value.toFixed(1)} kg
        </p>
        <p className="text-sm">
          Weight: {payload[0].payload.weight.toFixed(1)} kg
        </p>
      </div>
    );
  }
  return null;
};

export default function WeightDashboard() {
  const [targetWeight, setTargetWeight] = useState(70.0);
  const [currentWeight, setCurrentWeight] = useState(69.1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sampleData, setSampleData] = useState([]);
  const [monthlyAverage, setMonthlyAverage] = useState(69.8);
  const [dailyWeightLoss, setDailyWeightLoss] = useState(-0.2);

  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyData[month] || [];
    const weekData = getWeekData(selectedDate, monthData);
    setSampleData(weekData);
    setMonthlyAverage(
      monthData.reduce((sum, entry) => sum + entry.weight, 0) / monthData.length
    );
    if (weekData.length > 1) {
      setDailyWeightLoss(weekData[weekData.length - 1].weightLoss);
    }
  }, [selectedDate]);

  return (
    <div className="p-6 sm:px-20 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Weight & Monthly Average */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Current Weight</h2>
          <p className="text-3xl font-bold">{currentWeight.toFixed(1)} kg</p>
          <p className="text-sm text-gray-500">
            Target: {targetWeight.toFixed(1)} kg
          </p>
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Monthly Average</h3>
            <p className="text-2xl font-bold">{monthlyAverage.toFixed(1)} kg</p>
          </div>
        </CardContent>
      </Card>

      {/* Daily Weight Loss with Enhanced Tooltip */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Daily Weight Change</h2>
          <p className="text-3xl font-bold">
            {dailyWeightLoss > 0 ? "+" : ""}
            {dailyWeightLoss.toFixed(1)} kg
          </p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={sampleData}>
                <XAxis dataKey="day" hide />
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="weightLoss"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weight Inputs */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Update Weight</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Enter your target weight in kg
              </label>
              <input
                type="number"
                step="0.1"
                className="border p-2 w-full rounded"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                placeholder="Enter target weight"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Enter your current weight in kg
              </label>
              <input
                type="number"
                step="0.1"
                className="border p-2 w-full rounded"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                placeholder="Enter current weight"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Graph for Weekly Weight */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Weight Trend (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent>
          <Calendar
            mode="month"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
