import React from "react";

export function O2Progress({ value }) {
  return (
    <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-red-500 h-full transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
