import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Page/Home.jsx";
import StepsDashboard from "./Page/StepsDashboard.jsx";
import Register from "./Page/Authentication/Register.jsx";
import Model from "./MODEL/Model.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/model",
        element: <Model />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
