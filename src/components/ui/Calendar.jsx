import React, {useState} from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function Calendar({ selected, onSelect }) {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDayData, setSelectedDayData] = useState(null);
    
  const handleChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      onSelect(newDate);
    }
  };
  
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
    <div className="bg-white rounded-lg shadow-sm p-6">
    {/* <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Date</h2>
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
    </div> */}
    <div className="text-center mb-4 font-medium">
      {/* {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })} */}
      <div className="flex justify-between items-center mb-4 px-3">
        <button 
          onClick={() => changeMonth(-1)} 
          className="px-3 py-1 text-base cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
        >
          &lt; 
        </button>
        <h2 className="text-xl font-semibold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button 
          onClick={() => changeMonth(1)} 
          className="px-3 py-1 text-base cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
        >
         &gt;
        </button>
      </div>
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
  );
}