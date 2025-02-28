import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar({ selected, onSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selected));

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

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const handleDateClick = (day) => {
    // Create a new date object for the selected day in the current month
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    // Call the parent's onSelect callback
    onSelect(newDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-center mb-4 font-medium">
        <div className="flex justify-between items-center mb-4 px-3">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 text-base cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-xl font-semibold">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 text-base cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-gray-500 font-medium p-2">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDay }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isToday =
            day === new Date().getDate() &&
            currentMonth.getMonth() === new Date().getMonth() &&
            currentMonth.getFullYear() === new Date().getFullYear();

          const isSelected =
            day === selected.getDate() &&
            currentMonth.getMonth() === selected.getMonth() &&
            currentMonth.getFullYear() === selected.getFullYear();

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`p-2 text-center hover:bg-gray-100 rounded-lg transition-colors ${
                isToday ? "bg-blue-500 text-white font-bold" : ""
              } ${isSelected ? "bg-blue-200 font-bold" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
