import React, { useEffect, useState } from "react";
import axios from "axios";

const BMI = () => {
  const [userData, setUserData] = useState(null);
  const [bmi, setBMI] = useState("N/A");

  useEffect(() => {
    // Fetch user profile data (including height & weight)
    const fetchUserData = async () => {
      try {
        const response = await axios.get("user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }, // Assuming JWT auth
        });

        const { height, weight } = response.data; // Extract height & weight
        console.log(height, weight);
        if (height && weight) {
          const calculatedBMI = weight / ((height / 100) * (height / 100)); // BMI Formula
          setBMI(calculatedBMI.toFixed(0));
        }
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  console.log(bmi);

  // Determine BMI category
  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5)
      return {
        category: "Underweight",
        color: "bg-yellow-500",
        range: "< 18.5",
      };
    if (bmiValue >= 18.5 && bmiValue <= 24.9)
      return {
        category: "Normal Weight",
        color: "bg-green-500",
        range: "18.5 - 24.9",
      };
    if (bmiValue >= 25 && bmiValue <= 29.9)
      return {
        category: "Overweight",
        color: "bg-orange-500",
        range: "25 - 29.9",
      };
    return { category: "Obese", color: "bg-red-500", range: "≥ 30" };
  };

  const bmiCategory = getBMICategory(parseFloat(bmi));

  return (
    <div className="flex flex-col items-start p-6 h-full">
      <h2 className="text-2xl font-bold mb-4">BMI Status</h2>

      <div
        className={`flex items-center justify-center w-16 h-16 ${bmiCategory.color} rounded-full mb-3`}
      >
        <span className="text-xl font-bold text-white">BMI</span>
      </div>

      <div className="text-xl font-medium">{bmi}</div>

      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <div
            className={`w-2 h-2 rounded-full ${bmiCategory.color} mr-2`}
          ></div>
          <span>{bmiCategory.category}</span>
        </div>
        <div className="text-xs text-gray-500 ml-4">{bmiCategory.range}</div>
      </div>
    </div>
  );
};

export default BMI;
