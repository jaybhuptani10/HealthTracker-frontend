import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home.jsx";
import StepsDashboard from "./Page/StepsDashboard.jsx";
import Register from "./Page/Authentication/Register.jsx";
import Model from "./MODEL/Model.jsx";
import ProtectedRoute from "./Page/Authentication/ProtectedRoute.jsx"; // Import the ProtectedRoute
import SensorData from "./sensordata/SensorData.jsx";
import HeartRateDashboard from "./Page/HeartrateDashboard.jsx";
import WeightDashboard from "./Page/WeightDashboard.jsx";
import CalorieDashboard from "./Page/CalorieDashboard.jsx";
import SleepDashboard from "./Page/SleepDashboard.jsx";
import UserDashboard from "./Page/UserDashboard.jsx";
import SpO2Dashboard from "./Page/O2.jsx"; // Import the new SpO2 dashboard
import Checklist from "./Page/Checklist.jsx"; // Import the Checklist page
import MedicalRecords from "./Page/MedicalRecords.jsx"; // Import the MedicalRecords page
import WaterIntakeDashboard from "./Page/WaterDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/authentication",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />, // Wrap protected routes
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/steps",
            element: <StepsDashboard />,
          },
          {
            path: "/model",
            element: <Model />,
          },
          {
            path: "/sensor",
            element: <SensorData />,
          },
          {
            path: "/heartrate",
            element: <HeartRateDashboard />,
          },
          {
            path: "/weightdashboard",
            element: <WeightDashboard />,
          },
          {
            path: "/caloriedashboard",
            element: <CalorieDashboard />,
          },
          {
            path: "/sleepdashboard",
            element: <SleepDashboard />,
          },
          {
            path: "/userdashboard",
            element: <UserDashboard />,
          },
          {
            path: "/spo2dashboard",
            element: <SpO2Dashboard />,
          },
          {
            path: "/checklist",
            element: <Checklist />,
          },
          {
            path: "/medicalrecords",
            element: <MedicalRecords />,
          },
          {
            path: "/waterdashboard",
            element: <WaterIntakeDashboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
