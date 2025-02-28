import React from "react";
import { Link } from "react-router-dom";
// Custom tracker icons with consistent styling
const TrackerIcons = {
  steps: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="2"
    >
      <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
    </svg>
  ),
  sleep: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#6366F1"
      strokeWidth="2"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  medicine: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#EF4444"
      strokeWidth="2"
    >
      <rect x="7" y="3" width="10" height="18" rx="1" />
      <path d="M7 9h10M7 15h10M12 3v18" />
    </svg>
  ),
  calories: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#F97316"
      strokeWidth="2"
    >
      <path d="M12 2.5c-1.5 2-5 5-5 10 0 4.5 2.5 7.5 5 7.5s5-3 5-7.5c0-5-3.5-8-5-10z" />
    </svg>
  ),
  heart: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#EC4899"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  water: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="2"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  weight: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#22C55E"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  exercise: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="#A855F7"
      strokeWidth="2"
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M6 8H5a4 4 0 0 0 0 8h1" />
      <path d="M3 12h18" />
    </svg>
  ),
};

const TrackerOption = ({ icon, title, description, path }) => {
  return (
    <Link to={path}>
      <div className="bg-white transition-all duration-200 ease-in hover:bg-green-300 rounded-lg shadow-sm border border-gray-100 mb-3 h-full">
        <div className="flex items-center py-4 px-5 h-full">
          <div className="flex-shrink-0 mr-4">{icon}</div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-800 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="text-gray-300 ml-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

const HealthTrackersInTwoColumns = () => {
  const trackers = [
    {
      icon: TrackerIcons.steps,
      title: "Steps Tracker",
      description: "Track your daily steps and activity",
      path: "/steps",
    },
    {
      icon: TrackerIcons.sleep,
      title: "Sleep Tracker",
      description: "Monitor your sleep patterns and quality",
      path: "/sleepdashboard",
    },
    {
      icon: TrackerIcons.medicine,
      title: "Medicine Tracker",
      description: "Keep track of your medications and doses",
      path: "/medicine",
    },
    {
      icon: TrackerIcons.calories,
      title: "Calories Burnt",
      description: "Track calories burned through activities",
      path: "/caloriedashboard",
    },
    {
      icon: TrackerIcons.heart,
      title: "Heart Rate",
      description: "Monitor your heart rate and zones",
      path: "/heartrate",
    },
    {
      icon: TrackerIcons.water,
      title: "Water Tracker",
      description: "Track your daily water intake",
      path: "/waterdashboard",
    },
    {
      icon: TrackerIcons.weight,
      title: "Weight Tracker",
      description: "Monitor your weight and body changes",
      path: "/weightdashboard",
    },
    {
      icon: TrackerIcons.exercise,
      title: "Exercise Tracker",
      description: "Log and monitor your workouts",
      path: "/exercise",
    },
  ];

  return (
    <div className="w-full min-h-screen  flex">
      <div className="max-w-4xl mx-auto px-6 py-8 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Health Trackers
        </h1>

        <div className="grid grid-cols-2 gap-4 cursor-pointer">
          {trackers.map((tracker, index) => (
            <div key={index} className="h-full ">
              <TrackerOption {...tracker} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTrackersInTwoColumns;
