import React from "react";

export function Progress({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-blue-500 h-full transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
