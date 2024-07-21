import React, { useState, useEffect } from "react";
import sendRequest from "../../Apicalls/SendData";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../Zustand/Loginstore";

export default function Adminlogin() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, initialize, checkTokenExpiry, isAuthenticated } =
    useAdminStore((state) => ({
      login: state.login,
      initialize: state.initialize,
      checkTokenExpiry: state.checkTokenExpiry,
      isAuthenticated: state.isAuthenticated,
    }));

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest("/login", "post", formdata);
      console.log("Response:", response);

      if (response?.status) {
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

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (checkTokenExpiry()) {
      alert("Session expired. Please log in again.");
      navigate("/admin-login");
    }
  }, [checkTokenExpiry, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/confirm-resources");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex h-screen justify-center pt-10">
      <div className="border h-80 sm:w-1/3 sm:h-96 rounded-lg block sm:flex">
        <div
          className="p-4 sm:block flex justify-center items-center"
          style={{ backgroundColor: "#29306B" }}
        >
          <img
            src="./icons/codiopathlogowhite.png"
            className="hidden sm:block h-40 sm:h-48"
            alt="Logo"
          />
          <p
            style={{ fontFamily: "cursive" }}
            className="text-white text-center font-medium text-xl"
          >
            {"<Welcome back/>"}
          </p>
        </div>
        <div className="p-4">
          <h1
            className="text-3xl font-medium"
            style={{ color: "#29306B", fontFamily: "cursive" }}
          >
            Admin Login
          </h1>
          <form
            onSubmit={handleFormSubmit}
            className="space-y-5 p-0 sm:p-5 mt-6"
          >
            <div className="text-left w-40">
              <label style={{ color: "#29306B" }} className="text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleFormChange}
                placeholder="Enter here"
                className="bg-gray-100 w-40 h-9"
              />
            </div>
            <div className="text-left w-28 sm:w-40">
              <label className="text-sm" style={{ color: "#29306B" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleFormChange}
                className="w-40 bg-gray-100 h-9"
                placeholder="Enter here"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="hover:translate-x-2 duration-150 p-2 rounded-sm text-white"
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
