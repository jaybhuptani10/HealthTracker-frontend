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

  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => {
      const calories = 2000 + (Math.random() * 400 - 200);
      return {
        day: `Day ${day + 1}`,
        date: new Date(2025, months.indexOf(month), day + 1).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        ),
        calories: Math.round(calories),
        macros: {
          protein: Math.round(calories * 0.3),
          carbs: Math.round(calories * 0.45),
          fat: Math.round(calories * 0.25),
        },
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

export default function CalorieDashboard() {
  const [targetCalories, setTargetCalories] = useState(2000);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sampleData, setSampleData] = useState([]);
  const [monthlyAverage, setMonthlyAverage] = useState(1950);
  const [calorieData, setCalorieData] = useState({
    calories: 1850,
    macros: {
      protein: 140,
      carbs: 210,
      fat: 65,
    },
  });

  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyData[month] || [];

    // Get data for the specific selected day
    const dayIndex = selectedDate.getDate() - 1;
    const dayData =
      dayIndex >= 0 && dayIndex < monthData.length ? monthData[dayIndex] : null;

    // Get week data for the chart
    const weekData = getWeekData(selectedDate, monthData);
    setSampleData(weekData);

    // Calculate monthly average
    setMonthlyAverage(
      Math.round(
        monthData.reduce((sum, entry) => sum + entry.calories, 0) /
          monthData.length
      )
    );

    // Update calorie data for the selected day
    if (dayData) {
      setCalorieData({
        calories: dayData.calories,
        macros: dayData.macros,
      });
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-6 sm:px-20 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Calories & Monthly Average */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">
            Calories for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </h2>
          <p className="text-3xl font-bold">{calorieData.calories} kcal</p>
          <p className="text-sm text-gray-500">Target: {targetCalories} kcal</p>
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Monthly Average</h3>
            <p className="text-2xl font-bold">{monthlyAverage} kcal</p>
          </div>
        </CardContent>
      </Card>

      {/* Macronutrient Breakdown */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Macronutrients</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Protein ({calorieData.macros.protein}g)
                </span>
                <span className="text-sm text-gray-500">30%</span>
              </div>
              <Progress
                value={30}
                className="h-2 bg-gray-200"
                indicatorClassName="bg-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Carbs ({calorieData.macros.carbs}g)
                </span>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <Progress
                value={45}
                className="h-2 bg-gray-200"
                indicatorClassName="bg-green-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Fat ({calorieData.macros.fat}g)
                </span>
                <span className="text-sm text-gray-500">25%</span>
              </div>
              <Progress
                value={25}
                className="h-2 bg-gray-200"
                indicatorClassName="bg-yellow-500"
              />
            </div>

            <div className="pt-2 mt-2 border-t">
              <p className="text-sm text-gray-600">
                Daily recommended ratio:
                <br />
                30% Protein • 45% Carbs • 25% Fat
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calorie Inputs */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Update Calories</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Enter your target daily calories
              </label>
              <input
                type="number"
                step="50"
                className="border p-2 w-full rounded"
                value={targetCalories}
                onChange={(e) => setTargetCalories(Number(e.target.value))}
                placeholder="Enter target calories"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Enter your current daily calories
              </label>
              <input
                type="number"
                step="50"
                className="border p-2 w-full rounded"
                value={calorieData.calories}
                onChange={(e) =>
                  setCalorieData({
                    ...calorieData,
                    calories: Number(e.target.value),
                  })
                }
                placeholder="Enter current calories"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Graph for Weekly Calories */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Calorie Trend (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="calories"
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
          <Calendar selected={selectedDate} onSelect={handleDateSelect} />
        </CardContent>
      </Card>
    </div>
  );
}
