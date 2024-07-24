import React, { useState, useEffect } from "react";
import sendRequest from "../../Apicalls/SendData";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../Zustand/Loginstore";

export default function Adminlogin() {
  // Styles for the container
  const containerStyle = {
    position: "relative",
    padding: "4rem",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#29306B",
    overflow: "hidden", // Ensure skewed element doesn't overflow the container
    clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)", // Clip the right side inward
  };

  // Styles for the image
  const imageStyle = {
    display: "none", // Default display is hidden
    "@media (min-width: 640px)": {
      display: "block", // Becomes visible on larger screens
    },
    position: "relative",
    zIndex: 1, // Ensure the image is above the skewed part
  };

  // State for form data
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  // Zustand store functions
  const { login, initialize, checkTokenExpiry, isAuthenticated } =
    useAdminStore((state) => ({
      login: state.login,
      initialize: state.initialize,
      checkTokenExpiry: state.checkTokenExpiry,
      isAuthenticated: state.isAuthenticated,
    }));

  const navigate = useNavigate();

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formdata);
    try {
      const response = await sendRequest("post","/login" , formdata);
      console.log("Response:", response);

      if (response.status===true) {
        login(formdata.email, response.token);
        alert("Login Success");
        navigate("/confirm-resources");
      } else {
        alert("Login Failed: " + response.message);
      }
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  // Initialize Zustand store
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Check for token expiry
  useEffect(() => {
    if (checkTokenExpiry()) {
      alert("Session expired. Please log in again.");
      navigate("/admin-login");
    }
  }, [checkTokenExpiry, navigate]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/confirm-resources");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="grid sm:flex h-screen w-full">
      <div
        className="border w-full h-screen rounded-lg block sm:flex"
        // style={containerStyle}
      >
        {/* Dark blue skewed div */}
        <div className="hidden  sm:flex justify-center" style={containerStyle}>
          <img src="./images/discussinglogin.png" alt="Logo" />
        </div>

        {/* Form section */}
        <div className=" flex justify-center sm:w-1/2 pt-20">
          <form
            onSubmit={handleFormSubmit}
            className="space-y-5  p-0 sm:p-5 mt-6"
          >
            <h1
              className="text-4xl font-medium"
              style={{ color: "#29306B", fontFamily: "cursive" }}
            >
              Admin Login
            </h1>
            {/* Email input */}
            <div className="text-left w-64">
              <input
                type="email"
                name="email"
                onChange={handleFormChange}
                placeholder="Enter your email"
                className="  w-64  border-b-2 border-none  border-black focus:outline-none "
              />
              <div className="border" style={{ borderColor: "#29306B" }}></div>
            </div>

            {/* Password input */}
            <div className="text-left w-64">
              <input
                type="password"
                name="password"
                onChange={handleFormChange}
                className=" w-64  border-b-2 border-none  border-black focus:outline-none "
                placeholder="Enter your password here"
              />
              <div className="border" style={{ borderColor: "#29306B" }}></div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="hover:translate-x-2 hover:-translate-y-1 w-20  duration-150 p-2 rounded text-white"
                style={{ backgroundColor: "#29306B" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
