import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FitnessDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDayData, setSelectedDayData] = useState(null);

  // Sample weekly data
  const weeklyData = [
    { day: 'Mon', steps: 6000 },
    { day: 'Tue', steps: 7500 },
    { day: 'Wed', steps: 8000 },
    { day: 'Thu', steps: 5000 },
    { day: 'Fri', steps: 9000 },
    { day: 'Sat', steps: 11000 },
    { day: 'Sun', steps: 7000 }
  ];

  // Current stats
  const currentSteps = 7500;
  const goalSteps = 10000;
  const monthlyAverage = 8300;

  // Calculate calendar dates
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(selectedDate);

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  const handleDateClick = (day) => {
    // Simulate daily data for the selected date
    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00`,
      steps: Math.floor(Math.random() * 1000)
    }));
    setSelectedDayData(hourlyData);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Steps Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">Daily Steps</h2>
          <div className="text-4xl font-bold mb-4">{currentSteps.toLocaleString()}</div>
          <div className="relative h-2 bg-gray-100 rounded-full">
            <div 
              className="absolute h-2 bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(currentSteps / goalSteps) * 100}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-2">Goal: {goalSteps.toLocaleString()} steps</div>
        </div>

        {/* Monthly Average Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">Monthly Average Steps</h2>
          <div className="text-4xl font-bold">{monthlyAverage.toLocaleString()}</div>
        </div>
      </div>

      {/* Weekly Graph and Calendar Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weekly Steps Graph */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Steps Over the Week</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedDayData || weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={selectedDayData ? "hour" : "day"} stroke="#666" />
                <YAxis stroke="#666" />
                <Line 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Previous Months</h2>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="text-center mb-4 font-medium">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-gray-500 font-medium p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: startingDay }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handleDateClick(index + 1)}
                className="p-2 text-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessDashboard;