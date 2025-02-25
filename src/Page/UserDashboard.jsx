import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "/user/profile";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/authentication");
          return;
        }

        // Simulated user data
        setUser({
          username: "JohnDoe",
          email: "john.doe@example.com",
          phoneNumber: "+1 (555) 123-4567",
          age: 32,
          gender: "Male",
          height: 175,
          weight: 70,
          bloodType: "O+",
          lastCheckup: "2024-01-15",
          medications: ["Aspirin", "Vitamin D"],
          allergies: ["Peanuts", "Penicillin"],
          g1name: "Jane Doe",
          g1phone: "+1 (555) 987-6543",
          g1email: "jane.doe@example.com",
          g2name: "Robert Smith",
          g2phone: "+1 (555) 456-7890",
          g2email: "robert.smith@example.com",
          doc: "Dr. Sarah Johnson",
          docphone: "+1 (555) 234-5678",
          docemail: "dr.johnson@hospital.com",
          specialty: "Cardiologist",
          hospital: "Central Hospital",
          lastVisit: "2024-02-01"
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const TabButton = ({ name, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive 
          ? "bg-blue-500 text-white" 
          : "bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{name}</span>
    </button>
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full px-10 mx-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.username}'s Dashboard</h1>
              <p className="text-gray-500">Welcome back to your health portal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <TabButton
            name="Profile"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            name="Medical"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
            isActive={activeTab === "medical"}
            onClick={() => setActiveTab("medical")}
          />
          <TabButton
            name="Emergency"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
            isActive={activeTab === "emergency"}
            onClick={() => setActiveTab("emergency")}
          />
          <TabButton
            name="Doctor"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            isActive={activeTab === "doctor"}
            onClick={() => setActiveTab("doctor")}
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium text-gray-900">{user.phoneNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Age</label>
                    <p className="font-medium text-gray-900">{user.age} years</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Gender</label>
                    <p className="font-medium text-gray-900">{user.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Height</label>
                    <p className="font-medium text-gray-900">{user.height} cm</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Weight</label>
                    <p className="font-medium text-gray-900">{user.weight} kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "medical" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Blood Type</label>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {user.bloodType}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Checkup</label>
                    <p className="font-medium text-gray-900">{user.lastCheckup}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Medications</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.medications.map((med) => (
                        <span key={med} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Allergies</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.allergies.map((allergy) => (
                        <span key={allergy} className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emergency" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Emergency Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: user.g1name, phone: user.g1phone, email: user.g1email },
                  { name: user.g2name, phone: user.g2phone, email: user.g2email }
                ].map((contact, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "doctor" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Doctor Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Doctor Name</label>
                    <p className="font-medium text-gray-900">{user.doc}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Specialty</label>
                    <p className="font-medium text-gray-900">{user.specialty}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Hospital</label>
                    <p className="font-medium text-gray-900">{user.hospital}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium text-gray-900">{user.docphone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium text-gray-900">{user.docemail}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Visit</label>
                    <p className="font-medium text-gray-900">{user.lastVisit}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;