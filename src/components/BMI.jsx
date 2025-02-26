import React from "react";

const BMI = () => {
  return (
    <div className="flex flex-col items-start p-6 h-full">
      <h2 className="text-2xl font-bold mb-4">BMI Status</h2>

      <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-3">
        <span className="text-xl font-bold text-white">BMI</span>
      </div>

      <div className="text-xl font-medium">23.5</div>

      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>Normal Weight</span>
        </div>
        <div className="text-xs text-gray-500 ml-4">18.5 - 24.9</div>
      </div>
    </div>
  );
};

export default BMI;
