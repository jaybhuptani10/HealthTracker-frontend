import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Progress } from "../components/ui/Progress.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";
const generateSleepData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {};
  
  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => {
      const totalSleep = 6 + (Math.random() * 4); // Sleep duration between 6-10 hours
      const deepSleep = totalSleep * (0.2 + Math.random() * 0.1); // 20-30% deep sleep
      const remSleep = totalSleep * (0.2 + Math.random() * 0.1); // 20-30% REM sleep
      const lightSleep = totalSleep - deepSleep - remSleep;
      
      return {
        day: `Day ${day + 1}`,
        date: new Date(2025, months.indexOf(month), day + 1).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        totalSleep: Number(totalSleep.toFixed(1)),
        sleepQuality: Math.round(Math.random() * 30 + 70), // 70-100%
        phases: {
          deep: Number(deepSleep.toFixed(1)),
          rem: Number(remSleep.toFixed(1)),
          light: Number(lightSleep.toFixed(1))
        },
        sleepTime: `${Math.floor(Math.random() * 2) + 22}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        wakeTime: `${Math.floor(Math.random() * 2) + 6}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      };
    });
  });
  return data;
};

const dummyData = generateSleepData();

const getWeekData = (selectedDate, monthData) => {
  const dayIndex = selectedDate.getDate() - 1;
  const startIndex = Math.max(0, dayIndex - 6);
  return monthData.slice(startIndex, dayIndex + 1);
};

export default function SleepDashboard() {
  const [targetSleep, setTargetSleep] = useState(8);
  const [currentSleep, setCurrentSleep] = useState(7.5);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sampleData, setSampleData] = useState([]);
  const [monthlyAverage, setMonthlyAverage] = useState(7.8);
  const [sleepPhases, setSleepPhases] = useState({
    deep: 2.2,
    rem: 1.8,
    light: 3.5
  });
  const [sleepQuality, setSleepQuality] = useState(85);
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");

  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyData[month] || [];
    const weekData = getWeekData(selectedDate, monthData);
    setSampleData(weekData);
    setMonthlyAverage(
      Number((monthData.reduce((sum, entry) => sum + entry.totalSleep, 0) / monthData.length).toFixed(1))
    );
    if (weekData.length > 0) {
      const lastEntry = weekData[weekData.length - 1];
      setSleepPhases(lastEntry.phases);
      setSleepQuality(lastEntry.sleepQuality);
      setBedtime(lastEntry.sleepTime);
      setWakeTime(lastEntry.wakeTime);
    }
  }, [selectedDate]);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Sleep Stats */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Last Night's Sleep</h2>
          <p className="text-3xl font-bold">{currentSleep} hours</p>
          <p className="text-sm text-gray-500">Target: {targetSleep} hours</p>
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Monthly Average</h3>
            <p className="text-2xl font-bold">{monthlyAverage} hours</p>
          </div>
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">Sleep Quality</h3>
            <div className="flex items-center gap-2">
              <Progress value={sleepQuality} className="h-2 bg-gray-200" />
              <span className="text-sm font-medium">{sleepQuality}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Phases */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Sleep Phases</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Deep Sleep ({sleepPhases.deep}h)</span>
                <span className="text-sm text-gray-500">
                  {Math.round((sleepPhases.deep / currentSleep) * 100)}%
                </span>
              </div>
              <Progress 
                value={(sleepPhases.deep / currentSleep) * 100} 
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-blue-500" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">REM ({sleepPhases.rem}h)</span>
                <span className="text-sm text-gray-500">
                  {Math.round((sleepPhases.rem / currentSleep) * 100)}%
                </span>
              </div>
              <Progress 
                value={(sleepPhases.rem / currentSleep) * 100} 
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-purple-500" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Light Sleep ({sleepPhases.light}h)</span>
                <span className="text-sm text-gray-500">
                  {Math.round((sleepPhases.light / currentSleep) * 100)}%
                </span>
              </div>
              <Progress 
                value={(sleepPhases.light / currentSleep) * 100} 
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-green-500" 
              />
            </div>

            <div className="pt-2 mt-2 border-t">
              <p className="text-sm text-gray-600">
                Optimal sleep phase distribution:
                <br />
                20-25% Deep • 20-25% REM • 50-60% Light
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Schedule */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Sleep Schedule</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Bedtime
              </label>
              <input
                type="time"
                className="border p-2 w-full rounded"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Wake time
              </label>
              <input
                type="time"
                className="border p-2 w-full rounded"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Target sleep duration (hours)
              </label>
              <input
                type="number"
                step="0.5"
                className="border p-2 w-full rounded"
                value={targetSleep}
                onChange={(e) => setTargetSleep(Number(e.target.value))}
                min="4"
                max="12"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Duration Trend */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Sleep Duration Trend (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis domain={[4, 12]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="totalSleep" 
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