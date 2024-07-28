import React, { useState } from "react";
import sendRequest from "../../Apicalls/SendData";
import Popup from "../../Components/DisplayComponents/Popup"; // Import the Popup component

export default function Postaresource() {
  const [resource, setResource] = useState({
    ResourceTitle: "",
    ResourceCategory: "",
    ResourceLink: "",
    ResourceType: "",
    Postername: "",
    Posteremail: "",
    ResourceDescription: "",
  });
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [popupType, setPopupType] = useState(""); // State for popup type (success/error)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResource((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 const closePopup = () => {
   setPopupMessage(""); // Clear the popup message
   setPopupType(""); // Clear the popup type
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest("post", "/resources", resource);
      if (response.message === "Resource submitted successfully") {
        setPopupMessage("Resource posted successfully!");
        setPopupType("success");
setTimeout(closePopup, 1000); 
      } else {
        setPopupMessage("Failed to post resource.");
        setPopupType("error");
      setTimeout(closePopup, 1000); 
      }
    } catch (error) {
      setPopupMessage("An error occurred while posting the resource.");
      setPopupType("error");
    }
  };

  const imageaddress = "./images/postaresource.jpg";

  const blueSectionStyle = {
    position: "relative",
    flex: "1 1 50%", // Takes 50% of the width
    backgroundColor: "#29306B",
    overflow: "hidden",
    justifyContent: "center",
    transform: "skewX(-15deg)", // Apply skew to the entire section
    transformOrigin: "top right",
  };

  const formContainerStyle = {
    flex: "1 1 50%", // Takes 50% of the width
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color for the form container
    position: "relative",
    left: "-15px", // Compensate for the skew to align the form correctly
    zIndex: 1, // Ensure the form is above the blue section
  };

  const imageStyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover", // Ensure the image covers the container
    display: "block",
  };

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="hidden sm:flex items-center" style={blueSectionStyle}>
        <img className="hidden sm:flex" src={imageaddress} alt="Resource" />
      </div>
      <div className="w-full pt-10 sm:w-1/2">
        <h1
          className="text-center font-semibold text-2xl mb-5"
          style={{ color: "#29306B" }}
        >
          Post a Resource
        </h1>
        <form onSubmit={handleSubmit} className="grid justify-center w-full">
          {/* Title and category */}
          <div className="grid sm:flex space-x-2 mb-4">
            <input
              type="text"
              name="ResourceTitle"
              onChange={handleChange}
              placeholder="Enter Resource Title"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 w-full sm:w-2/3"
            />
            <input
              type="text"
              name="ResourceCategory"
              onChange={handleChange}
              placeholder="Enter Resource Category"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 w-full sm:w-2/3"
            />
          </div>
          {/* URL and Type */}
          <div className="grid sm:flex space-x-2 mb-4">
            <input
              type="text"
              onChange={handleChange}
              name="ResourceLink"
              placeholder="Enter Resource URL"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 w-full sm:w-2/3"
            />
            <select
              name="ResourceType"
              onChange={handleChange}
              value={resource.ResourceType} // Bind value to state
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 text-gray-400 w-full sm:w-2/3"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="youtubevideo">YouTube Video</option>
              <option value="paidcourse">Paid Course</option>
              <option value="blogwebsite">Blog Website</option>
            </select>
          </div>

          {/* Name and email */}
          <div className="grid sm:flex space-x-2 mb-4">
            <input
              type="text"
              name="Postername"
              onChange={handleChange}
              placeholder="Enter your name"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 w-full sm:w-2/3"
            />
            <input
              type="email"
              name="Posteremail"
              onChange={handleChange}
              placeholder="Enter your email"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 w-full sm:w-2/3"
            />
          </div>

          {/* Description */}
          <div className="flex justify-center w-full mb-6">
            <textarea
              name="ResourceDescription"
              onChange={handleChange}
              placeholder="Enter Resource Description"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 w-full h-32"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full">
            <button
              className="gradient-button text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {/* Popup Component for messages */}
      <Popup message={popupMessage} type={popupType} />
    </div>
  );
}
