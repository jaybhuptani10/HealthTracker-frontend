import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Calendar } from "../components/ui/Calendar.jsx";

const generateHeartRateData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {};
  
  months.forEach((month) => {
    data[month] = Array.from({ length: 30 }, (_, day) => {
      const avgHeartRate = 60 + (Math.random() * 40);
      const minHeartRate = avgHeartRate - (5 + Math.random() * 10);
      const maxHeartRate = avgHeartRate + (Math.random() * 10);
      
      return {
        day: `Day ${day + 1}`,
        date: new Date(2025, months.indexOf(month), day + 1).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        avgHeartRate: Math.round(avgHeartRate),
        minHeartRate: Math.round(minHeartRate),
        maxHeartRate: Math.round(maxHeartRate)
      };
    });
  });
  return data;
};

const dummyData = generateHeartRateData();

const getWeekData = (selectedDate, monthData) => {
  const dayIndex = selectedDate.getDate() - 1;
  const startIndex = Math.max(0, dayIndex - 6);
  return monthData.slice(startIndex, dayIndex + 1);
};

export default function HeartRateDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sampleData, setSampleData] = useState([]);
  const [avgHeartRate, setAvgHeartRate] = useState(75);
  const [minHeartRate, setMinHeartRate] = useState(60);
  const [maxHeartRate, setMaxHeartRate] = useState(90);
  
  useEffect(() => {
    const month = selectedDate.toLocaleString("default", { month: "short" });
    const monthData = dummyData[month] || [];
    const weekData = getWeekData(selectedDate, monthData);
    setSampleData(weekData);
    if (weekData.length > 0) {
      const lastEntry = weekData[weekData.length - 1];
      setAvgHeartRate(lastEntry.avgHeartRate);
      setMinHeartRate(lastEntry.minHeartRate);
      setMaxHeartRate(lastEntry.maxHeartRate);
    }
  }, [selectedDate]);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Last Recorded Heart Rate</h2>
          <p className="text-3xl font-bold">{avgHeartRate} BPM</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Heart Rate Range</h2>
          <p className="text-lg">Min: {minHeartRate} BPM</p>
          <p className="text-lg">Max: {maxHeartRate} BPM</p>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Heart Rate Trend (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="avgHeartRate" fill="#4F46E5" name="Avg Heart Rate" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Heart Rate Variation</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sampleData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Area type="monotone" dataKey="minHeartRate" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Min Heart Rate" />
              <Area type="monotone" dataKey="maxHeartRate" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Max Heart Rate" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
