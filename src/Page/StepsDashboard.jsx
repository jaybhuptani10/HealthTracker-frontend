import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Progress } from "../components/ui/Progress.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";


const generateDummyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {};
  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => ({
      day: `Day ${day + 1}`,
      steps: Math.floor(Math.random() * 12000),
    }));
  });
  return data;
};

const dummyData = generateDummyData();

const getWeekData = (selectedDate, monthData) => {
  const dayIndex = selectedDate.getDate() - 1;
  const startIndex = Math.max(0, dayIndex - 6);
  return monthData.slice(startIndex, dayIndex + 1);
};

export default function StepsDashboard() {
  const [goal, setGoal] = useState(10000);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sampleData, setSampleData] = useState([]);
  const [dailySteps, setDailySteps] = useState(7500);
  const [monthlyAverage, setMonthlyAverage] = useState(8300);

  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyData[month] || [];
    const weekData = getWeekData(selectedDate, monthData);
    setSampleData(weekData);
    setDailySteps(monthData[Math.floor(Math.random() * monthData.length)].steps);
    setMonthlyAverage(
      monthData.reduce((sum, entry) => sum + entry.steps, 0) / monthData.length
    );
  }, [selectedDate]);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Daily Steps */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Daily Steps</h2>
          <p className="text-3xl font-bold">{dailySteps}</p>
          <Progress value={(dailySteps / goal) * 100} className="mt-2" />
          <p className="text-sm text-gray-500">Goal: {goal} steps</p>
        </CardContent>
      </Card>

      {/* Monthly Average */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Monthly Average Steps</h2>
          <br/>
          <p className="text-3xl font-bold">{Math.floor(monthlyAverage)}</p>
        </CardContent>
      </Card>
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
          <br/>          
        </CardContent>
      </Card>
      

      {/* Line Graph for Weekly Steps */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Steps Over the Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="steps" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Calendar */}
      <Card>
        <CardContent>
          <Calendar 
            mode="month" 
            value={selectedDate} 
            onChange={(date) => setSelectedDate(date)} 
          />
        </CardContent>
      </Card>

      {/* Bar Chart for Monthly Steps */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Monthly Steps</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dummyData[selectedDate.toLocaleString("default", { month: "short" })] || []}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="steps" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      
    </div>
  );
}
