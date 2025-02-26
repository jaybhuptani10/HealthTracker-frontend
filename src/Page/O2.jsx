import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { O2Progress } from "../components/ui/O2Progress.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";

const generateSpO2Data = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {};
  
  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => {
      // Generate average SpO2 between 94-99%
      const averageSpO2 = 94 + (Math.random() * 5);
      
      // Generate min/max values
      const minSpO2 = averageSpO2 - (1 + Math.random() * 2);
      const maxSpO2 = Math.min(100, averageSpO2 + (Math.random() * 2));
      
      // Generate time below threshold counts
      const timeBelow90 = Math.random() > 0.9 ? Math.round(Math.random() * 10) : 0;
      const timeBelow95 = Math.round(Math.random() * 60);
      
      // Generate breathing rate (normal range: 12-20 breaths per minute)
      const breathingRate = 12 + (Math.random() * 8);
      
      return {
        day: `Day ${day + 1}`,
        date: new Date(2025, months.indexOf(month), day + 1).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        averageSpO2: Number(averageSpO2.toFixed(1)),
        minSpO2: Number(minSpO2.toFixed(1)),
        maxSpO2: Number(maxSpO2.toFixed(1)),
        timeBelow90: timeBelow90,
        timeBelow95: timeBelow95,
        breathingRate: Number(breathingRate.toFixed(1)),
        oxygenScore: Math.round((averageSpO2 - 90) * 10), // Score from 40-100 based on SpO2
        recordingTime: `${Math.floor(Math.random() * 8) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} hours`
      };
    });
  });
  return data;
};

const dummyData = generateSpO2Data();

const getWeekData = (selectedDate, monthData) => {
  const dayIndex = selectedDate.getDate() - 1;
  const startIndex = Math.max(0, dayIndex - 6);
  return monthData.slice(startIndex, dayIndex + 1);
};

export default function SpO2Dashboard() {
  const [targetSpO2, setTargetSpO2] = useState(95);
  const [currentSpO2, setCurrentSpO2] = useState(96.5);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sampleData, setSampleData] = useState([]);
  const [monthlyAverage, setMonthlyAverage] = useState(97.2);
  const [minSpO2, setMinSpO2] = useState(93.5);
  const [maxSpO2, setMaxSpO2] = useState(98.7);
  const [timeBelow90, setTimeBelow90] = useState(0);
  const [timeBelow95, setTimeBelow95] = useState(25);
  const [breathingRate, setBreathingRate] = useState(15.7);
  const [oxygenScore, setOxygenScore] = useState(85);
  const [recordingTime, setRecordingTime] = useState("7:30 hours");

  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyData[month] || [];
    const weekData = getWeekData(selectedDate, monthData);
    setSampleData(weekData);
    setMonthlyAverage(
      Number((monthData.reduce((sum, entry) => sum + entry.averageSpO2, 0) / monthData.length).toFixed(1))
    );
    if (weekData.length > 0) {
      const lastEntry = weekData[weekData.length - 1];
      setCurrentSpO2(lastEntry.averageSpO2);
      setMinSpO2(lastEntry.minSpO2);
      setMaxSpO2(lastEntry.maxSpO2);
      setTimeBelow90(lastEntry.timeBelow90);
      setTimeBelow95(lastEntry.timeBelow95);
      setBreathingRate(lastEntry.breathingRate);
      setOxygenScore(lastEntry.oxygenScore);
      setRecordingTime(lastEntry.recordingTime);
    }
  }, [selectedDate]);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Current SpO2 Stats */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Last Night's Blood Oxygen</h2>
          <p className="text-3xl font-bold">{currentSpO2}%</p>
          <p className="text-sm text-gray-500">Target: {targetSpO2}% or higher</p>
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Monthly Average</h3>
            <p className="text-2xl font-bold">{monthlyAverage}%</p>
          </div>
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Oxygen Score</h3>
            <div className="flex items-center gap-2">
              <O2Progress value={oxygenScore} className="h-2 bg-gray-200"  />
              <span className="text-sm font-medium">{oxygenScore}/100</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SpO2 Ranges */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Blood Oxygen Ranges</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Minimum SpO2</span>
                <span className="text-sm font-medium">{minSpO2}%</span>
              </div>
              <O2Progress 
                value={(minSpO2 - 85) * 6.67} // Scale from 85-100 to 0-100 for visual
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-red-500" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Average SpO2</span>
                <span className="text-sm font-medium">{currentSpO2}%</span>
              </div>
              <O2Progress 
                value={(currentSpO2 - 85) * 6.67}
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-blue-500" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Maximum SpO2</span>
                <span className="text-sm font-medium">{maxSpO2}%</span>
              </div>
              <O2Progress 
                value={(maxSpO2 - 85) * 6.67}
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-green-500" 
              />
            </div>

            <div className="pt-4 mt-2 border-t">
              <h3 className="text-sm font-medium mb-2">Time Below Thresholds</h3>
              <p className="text-sm">
                <span className="font-medium">Below 90%:</span> {timeBelow90} minutes
              </p>
              <p className="text-sm">
                <span className="font-medium">Below 95%:</span> {timeBelow95} minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Settings */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Monitoring Settings</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Target SpO2 (%)
              </label>
              <input
                type="number"
                step="0.5"
                className="border p-2 w-full rounded"
                value={targetSpO2}
                onChange={(e) => setTargetSpO2(Number(e.target.value))}
                min="90"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Low SpO2 Alert Threshold (%)
              </label>
              <input
                type="number"
                step="0.5"
                className="border p-2 w-full rounded"
                value="90"
              />
            </div>
            <div className="pt-4 mt-2 border-t">
              <h3 className="text-sm font-medium mb-2">Related Metrics</h3>
              <p className="text-sm">
                <span className="font-medium">Breathing Rate:</span> {breathingRate} breaths/min
              </p>
              <p className="text-sm">
                <span className="font-medium">Recording Duration:</span> {recordingTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SpO2 Trend */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">SpO2 Trend (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="averageSpO2" 
                stroke="#4F46E5" 
                strokeWidth={2} 
                name="Average SpO2"
              />
              <Line 
                type="monotone" 
                dataKey="minSpO2" 
                stroke="#EF4444" 
                strokeWidth={1.5} 
                strokeDasharray="3 3"
                name="Min SpO2"
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