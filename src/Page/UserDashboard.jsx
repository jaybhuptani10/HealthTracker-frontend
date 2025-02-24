import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";

const API_URL = "/user/profile"; // Update with your backend URL

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/authentication"); // Redirect if no token
          return;
        }

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect if unauthorized
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!user) {
    return <p className="text-center text-lg mt-10">Loading user data...</p>;
  }

  return (
    <div className="p-0 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        User Dashboard
      </h1>

      {/* Center Content */}
      <div className="flex flex-col items-center gap-6">
        {/* User Info */}
        <Card className="w-full md:w-3/4 lg:w-2/3 bg-white shadow-lg rounded-lg">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p className="break-words">
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Age:</strong> {user.age} years
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Height:</strong> {user.height} cm
              </p>
              <p>
                <strong>Weight:</strong> {user.weight} kg
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="w-full md:w-3/4 lg:w-2/3 bg-white shadow-lg rounded-lg">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-red-600 mb-4">
              Emergency Contacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>{user.g1name}:</strong> {user.g1phone} ({user.g1email})
              </p>
              <p>
                <strong>{user.g2name}:</strong> {user.g2phone} ({user.g2email})
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Doctor Info */}
        <Card className="w-full md:w-3/4 lg:w-2/3 bg-white shadow-lg rounded-lg">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-green-600 mb-4">
              Doctor Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Doctor Name:</strong> {user.doc}
              </p>
              <p>
                <strong>Phone:</strong> {user.docphone}
              </p>
              <p>
                <strong>Email:</strong> {user.docemail}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
