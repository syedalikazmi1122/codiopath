import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import sendRequest from "../../Apicalls/SendData";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await sendRequest("GET", "/allcategories"); // Replace with your API URL
        setCategories(response);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setIsLoading(false); // Set loading to false if there's an error
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-5 h-screen">
      <h1 className="text-3xl font-semibold mb-6" style={{ color: "#29306B" }}>
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          categories.map((category) => (
            <div
              key={category.id} // Ensure each category has a unique identifier
              className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
              style={{ borderColor: "#D1650E" }}
            >
              <RouterLink to={`/category/course/${category}`}>
                <div className="p-4">
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: "#29306B" }}
                  >
                    {category}
                  </h2>
                </div>
              </RouterLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-col space-y-4 p-4 border rounded-lg"
            style={{ backgroundColor: "GhostWhite" }}
          >
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-2/4 mx-auto"></div>
          </div>
        ))}
    </div>
  );
}
