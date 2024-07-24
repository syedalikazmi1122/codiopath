import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import sendRequest from "../../Apicalls/SendData";

export default function ViewResources() {
  const [resources, setResources] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState(""); // 'name' or 'category'

  // Fetch all resources initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest("GET", "/resources");
        console.log("data", data);
        setResources(data.slice(0, 10)); // Display only the first 10 results initially
      } catch (error) {
        console.log("The error is:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // Perform search by name or category
const handleSearch = async () => {
  let endpoint = "";
  if (searchType === "name") {
    endpoint = `/resources/search/title/${searchText}`;
  } else if (searchType === "category") {
    endpoint = `/resources/search/category/${searchText}`;
  }

  try {
    const searchResults = await sendRequest("GET", endpoint);
    setResources(searchResults.slice(0, 10)); // Limit results to 10
  } catch (error) {
    console.log("Error in fetching search results:", error);
  }
};

  return (
    <div className="p-4">
      <div className="flex justify-between p-2">
        <h1
          className="text-3xl sm:text-2xl font-medium"
          style={{ color: "#29306B" }}
        >
          Resources
        </h1>
        <button className="border h-9 p-2 text-white bg-blue-900 rounded-md hover:translate-x-0.5 hover:translate-y-1 duration-300">
          <RouterLink to="/post-resources">Add Resources</RouterLink>
        </button>
      </div>

      <div className="flex w-full">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search here"
          className="border p-2 m-2 placeholder:text-center rounded w-5/12"
        />
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setSearchType("category");
              handleSearch();
            }}
            className="border h-9 p-2 rounded-md text-white hover:translate-x-2 hover:translate-y-1 duration-300 bg-blue-900"
          >
            Search by Category
          </button>
          <button
            onClick={() => {
              setSearchType("name");
              handleSearch();
            }}
            className="border h-9 p-2 text-white rounded-md hover:translate-x-2 hover:translate-y-1 duration-300 bg-blue-900"
          >
            Search by Name
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <RouterLink to={`/see-each-resources/${resource._id}`} key={index}>
            <div
              className="border hover:translate-y-0.5 hover:translate-x-0.5 duration-200 rounded-md p-4"
              style={{ backgroundColor: "#29306B" }}
            >
              <h1 className="text-2xl text-white font-medium">
                {resource.ResourceTitle}
              </h1>
              <p className="text-white">{resource.ResourceDescription}</p>
            </div>
          </RouterLink>
        ))}
      </div>
    </div>
  );
}
