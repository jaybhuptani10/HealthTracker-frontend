import React from "react";

const O2 = ({ sensorData }) => {
  // Get the latest oxygen saturation (SPO2) value from sensor data
  const latestData = sensorData && sensorData.length > 0 ? sensorData[0] : null;
  const spo2 = latestData ? latestData.SPO2 : "N/A";

  return (
    <div className="flex flex-col items-start p-6 h-full">
      <h2 className="text-2xl font-bold mb-3">Oxygen Status</h2>

      <div className="flex items-center mb-2">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center">
          <span className="text-white font-bold">
            O<sub>2</sub>
          </span>
        </div>
      </div>

      <div className="text-lg font-medium">{spo2}%</div>
    </div>
  );
};

export default O2;
