import React from "react";

const HydrationTracker = () => {
  return (
    <div className="flex flex-col items-start p-6 h-full">
      <h2 className="text-2xl font-bold mb-3">Hydration</h2>

      <div className="flex items-center mb-2">
        <div className="w-12 h-6 bg-blue-400 rounded-full flex justify-center items-center">
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12,20C8.69,20 6,17.31 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14C18,17.31 15.31,20 12,20Z" />
          </svg>
        </div>
      </div>

      <div className="text-lg font-medium mb-2">1.2L / 2.5L</div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
        <div
          className="bg-blue-400 h-3 rounded-full"
          style={{ width: "48%" }}
        ></div>
      </div>

      <div className="w-full flex justify-between text-xs text-gray-500 mb-3">
        <span>0L</span>
        <span>48%</span>
        <span>2.5L</span>
      </div>

      <div className="text-xs text-blue-500 flex items-center">
        <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
        <span>Daily Goal</span>
      </div>
      <div className="text-xs text-gray-500 ml-3 mb-1">2.5 liters</div>
    </div>
  );
};

export default HydrationTracker;
