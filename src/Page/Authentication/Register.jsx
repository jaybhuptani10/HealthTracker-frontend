import React, { useState } from "react";
import { Eye, EyeOff, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    weight: "",
    height: "",
    gender: "",
    age: "",
    g1name: "",
    g1phone: "",
    g1email: "",
    g2name: "",
    g2phone: "",
    g2email: "",
    doc: "",
    docphone: "",
    docemail: "",
  });

  const notify = (msg, type = "info") => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current step:", currentStep);
    console.log("Form data:", formData);
  
    if (!isLogin && currentStep < 4) {
      // Validate fields for each step before proceeding
      switch (currentStep) {
        case 1:
          if (!formData.username || !formData.email || !formData.password) {
            notify("Please fill in all fields on this page", "error");
            return;
          }
          // Password validation
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          if (!passwordRegex.test(formData.password)) {
            notify(
              "Password must be at least 6 characters long and include uppercase, lowercase, numbers, and symbols.",
              "warn"
            );
            return;
          }
          break;
  
        case 2:
          if (!formData.phoneNumber || !formData.weight || !formData.height || !formData.gender || !formData.age) {
            notify("Please fill in all fields on this page", "error");
            return;
          }
          
          // Phone number validation - must be exactly 10 digits
          const phoneRegex = /^[0-9]{10}$/;
          if (!phoneRegex.test(formData.phoneNumber)) {
            notify("Phone number must be exactly 10 digits", "error");
            return;
          }
          
          // Additional validation for numeric fields
          if (parseInt(formData.age) <= 0 || parseInt(formData.weight) <= 0 || parseInt(formData.height) <= 0) {
            notify("Please enter valid numbers for age, weight, and height", "error");
            return;
          }
          break;
  
        case 3:
          console.log("Validating guardian information");
          
          // Validate Guardian 1 (required)
          if (!formData.g1name || !formData.g1phone || !formData.g1email) {
            notify("Please fill in all fields for Guardian 1", "error");
            return;
          }
          
          // Validate Guardian 2 (required)
          if (!formData.g2name || !formData.g2phone || !formData.g2email) {
            notify("Please fill in all fields for Guardian 2", "error");
            return;
          }
          
          try {
            // Phone number validation for guardians - must be exactly 10 digits
            const phoneRegex = /^[0-9]{10}$/;
            console.log("G1 phone test:", phoneRegex.test(formData.g1phone));
            console.log("G2 phone test:", phoneRegex.test(formData.g2phone));
            
            if (!phoneRegex.test(formData.g1phone)) {
              notify("Guardian 1 phone number must be exactly 10 digits", "error");
              return;
            }
            if (!phoneRegex.test(formData.g2phone)) {
              notify("Guardian 2 phone number must be exactly 10 digits", "error");
              return;
            }
            
            // Email validation for guardians
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log("G1 email test:", emailRegex.test(formData.g1email));
            console.log("G2 email test:", emailRegex.test(formData.g2email));
            
            if (!emailRegex.test(formData.g1email)) {
              notify("Please enter a valid email for Guardian 1", "error");
              return;
            }
            if (!emailRegex.test(formData.g2email)) {
              notify("Please enter a valid email for Guardian 2", "error");
              return;
            }
            
            // Check that Guardian 1 and Guardian 2 have different phone numbers and emails
            if (formData.g1phone === formData.g2phone) {
              notify("Guardian 1 and Guardian 2 must have different phone numbers", "error");
              return;
            }
            if (formData.g1email === formData.g2email) {
              notify("Guardian 1 and Guardian 2 must have different email addresses", "error");
              return;
            }
            
            console.log("All guardian validations passed!");
          } catch (validationError) {
            console.error("Validation error:", validationError);
            notify("Error during validation. Please check console.", "error");
            return;
          }
          break;
      }
      
      console.log("Proceeding to next step");
      setCurrentStep((prev) => prev + 1);
      return;
    }
  
    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          notify("Please fill in all fields", "warn");
          return;
        }
        const response = await axios.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        notify("Login successful!", "success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // Final validation before registration
        if (!formData.doc || !formData.docphone || !formData.docemail) {
          notify("Please fill in all doctor details", "error");
          return;
        }
        
        // Validate doctor phone number - must be exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.docphone)) {
          notify("Doctor's phone number must be exactly 10 digits", "error");
          return;
        }
        
        // Validate doctor email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.docemail)) {
          notify("Please enter a valid email for your doctor", "error");
          return;
        }
  
        const response = await axios.post("/user/register", formData);
        console.log("Registration successful:", response.data);
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        notify("Registration successful!", "success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      notify("An error occurred. Please try again.", "error");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email/Username
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email or username"
          onChange={handleChange}
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>
  );

  const renderSignupStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Guardian 1</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="g1name"
                  value={formData.g1name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="g1phone"
                  value={formData.g1phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="g1email"
                  value={formData.g1email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Guardian 2</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="g2name"
                  value={formData.g2name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="g2phone"
                  value={formData.g2phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="g2email"
                  value={formData.g2email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Doctor Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="doc"
                value={formData.doc}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="docphone"
                value={formData.docphone}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="docemail"
                value={formData.docemail}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[450px] bg-white p-8 rounded-xl shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setCurrentStep(1);
              }}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        {isLogin ? (
          renderLoginForm() 
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 mx-1 rounded-full ${
                    step <= currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {renderSignupStep()}

            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                  currentStep === 1 ? "w-full" : ""
                }`}
              >
                {currentStep < 4 ? (
                  <>
                    Next
                    <ChevronRight size={20} />
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
