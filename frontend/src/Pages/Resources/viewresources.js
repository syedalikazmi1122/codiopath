import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import sendRequest from "../../Apicalls/SendData";
import Popup from "../../Components/DisplayComponents/Popup"; // Correct import path for Popup
import "../../App.css";

export default function ViewResources() {
  const [resources, setResources] = useState([]);
  const [keyword, setSearchText] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State for loading

  // Fetch all resources initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const response = await sendRequest("GET", "/resources");
        const data = Array.isArray(response) ? response : response.resources;
        setResources(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setIsLoading(false); // Set loading to false if there's an error
        if (error.message === "No resources found") {
          setPopupMessage("No resources found.");
          setPopupType("error");
          setTimeout(closePopup, 2000); // Close popup after 2 seconds
        } else {
          console.log("The error is:", error);
        }
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle search action
  const handleSearch = async () => {
    if (keyword.trim() === "") return;
    try {
      setIsLoading(true); // Set loading to true before fetching
      const response = await sendRequest(
        "GET",
        `/resources/search?keyword=${keyword}`
      );
      const searchResults = Array.isArray(response)
        ? response
        : response.resources;
      setResources(searchResults);
      setIsLoading(false); // Set loading to false after data is fetched
      if (searchResults.length === 0) {
        setPopupMessage("No resources found.");
        setPopupType("error");
        setTimeout(closePopup, 2000); // Close popup after 2 seconds
      }
    } catch (error) {
      setIsLoading(false); // Set loading to false if there's an error
      console.log("Error in fetching search results:", error);
      setPopupMessage("An error occurred. Please try again.");
      setPopupType("error");
      setTimeout(closePopup, 2000); // Close popup after 2 seconds
    }
  };

  // Handle search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close the popup
  const closePopup = () => {
    setPopupMessage("");
    setPopupType("");
  };

  // Generate star ratings based on the resource rating
  function generateStars(rating) {
    const totalStars = 5;
    let stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="text-lg text-amber-600">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-lg text-gray-300">
            ☆
          </span>
        );
      }
    }

    return stars;
  }

  return (
    <div className="p-4 h-screen">
      {popupMessage && (
        <Popup message={popupMessage} type={popupType} onClose={closePopup} />
      )}
      <div className="flex justify-between p-2">
        <h1
          className="text-4xl sm:text-2xl font-semibold"
          style={{ color: "#29306B" }}
        >
          Resources
        </h1>
        <button className="border p-2 text-white rounded-full bg-blue-900 hover:translate-x-0.5 hover:translate-y-1 duration-300 gradient-button">
          <RouterLink to="/post-resources" className="text-sm sm:text-base md:text-base lg:text-lg">Add Resources</RouterLink>
        </button>
      </div>

      <div className="flex w-full">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search here"
          className="border p-2 m-2 placeholder:text-center rounded-sm  sm:w-5/12"
        />
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSearch}
            className="border h-9 p-2 text-white rounded-md hover:translate-x-2 hover:translate-y-1 duration-300 gradient-button"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          resources.map((resource, index) => (
            <RouterLink to={`/see-each-resources/${resource._id}`} key={index}>
              <div
                className="border hover:translate-y-0.5 hover:translate-x-0.5 duration-200 rounded-md p-4"
                style={{
                  backgroundColor: "GhostWhite",
                  color: "#1F2937",
                }}
              >
                <h1 className="text-2xl sm:text-4xl font-semibold">
                  {resource.ResourceTitle || resource.title}
                </h1>
                <p className="text-sm">
                  Resource is related to{" "}
                  <span className="font-semibold">
                    {resource.ResourceCategory || resource.category}
                  </span>{" "}
                </p>
                <p>
                  Resource Type is{" "}
                  <span className="font-semibold">
                    {resource.ResourceType || resource.type}
                  </span>{" "}
                </p>
                <p>{generateStars(resource.rating)}</p>
              </div>
            </RouterLink>
          ))
        )}
      </div>
    </div>
  );
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
