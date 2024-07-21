import React, { useState } from "react";
import { FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import "./Confirmresources.css"; // Create a separate CSS file for additional styles

export default function ConfirmResources() {
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    {
      title: "JavaScript Basics",
      type: "Video",
      postedBy: "John Doe",
      email: "john.doe@example.com",
      description: "A video tutorial on JavaScript basics.",
      category: "YouTube",
    },
    {
      title: "Python Crash Course",
      type: "Text",
      postedBy: "Jane Smith",
      email: "john ",
      description: "A text tutorial on Python programming.",
      category: "Blog",
    },
    {
      title: "Python Crash Course",
      type: "Text",
      postedBy: "Jane Smith",
      email: "john ",
      description: "A text tutorial on Python programming.",
      category: "Blog",
    },
    // Add more resource objects as needed
  ];

  const handleRowClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleCloseOverlay = () => {
    setSelectedResource(null);
  };

  return (
    <div className="flex w-screen h-screen p-6 bg-gray-100">
      <div className="w-full">
        <h1 className="text-xl sm:text-3xl mb-6 text-center">
          Manage Resources
        </h1>
        <div className=" grid sm:flex  justify-between mb-6">
          <div className="w-full sm:w-1/2 pr-3">
            <h2 className="text-lg sm:text-xl mb-3 text-center">
              Pending Courses
            </h2>
            <div className="flex justify-center mb-3">
              <input
                type="text"
                placeholder="Search Pending Courses"
                className="w-3/4 p-2  text-sm sm:text-base border rounded"
              />
            </div>
            <table className="w-full bg-white shadow rounded-lg">
              <thead className=" text-white"
              style={{ backgroundColor: "#29306B" }}
              >
                <tr>
                  <th className="p-1 sm:p-3 text-sm sm:text-base  text-left">
                    Title
                  </th>
                  <th className="p-3 text-sm sm:text-base text-left">Type</th>
                  <th className="p-3 text-sm sm:text-base text-left">
                    Posted By
                  </th>
                  <th className="p-3 text-sm sm:text-base text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(resource)}
                  >
                    <td className="p-1 sm:p-3 text-xs sm:text-base">
                      {resource.title}
                    </td>
                    <td className="p-1 sm:p-3 text-xs sm:text-base">
                      {resource.type}
                    </td>
                    <td className="p-1 sm:p-3 text-xs sm:text-base">
                      {resource.postedBy}
                    </td>
                    <td className=" p-1 sm:p-3 text-xs  sm:text-base flex space-x-2">
                      <FaCheck
                        className="text-green-500 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full sm:w-1/2 pl-3">
            <h2 className="text-xl mb-3 text-center">Approved Courses</h2>
            <div className="flex justify-center mb-3">
              <input
                type="text"
                placeholder="Search Approved Courses"
                className="w-3/4 p-2 border rounded"
              />
            </div>
            <table className="w-full bg-white shadow rounded-lg">
              <thead className=" text-white"
              style={{ backgroundColor: "#29306B" }}>
                <tr>
                  <th className="p-3  text-sm sm:text-base text-left">Title</th>
                  <th className="p-3 text-sm sm:text-base text-left">Type</th>
                  <th className="p-3 text-sm sm:text-base text-left">
                    Posted By
                  </th>
                  <th className="p-3 text-sm sm:text-base text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{/* Repeat resource rows for approved courses */}</tbody>
            </table>
          </div>
        </div>
        {selectedResource && (
          <div className="overlay">
            <div className="overlay-content">
              <button className="close-button" onClick={handleCloseOverlay}>
                <FaTimes />
              </button>
              <h2 className="text-2xl mb-4">{selectedResource.title}</h2>
              <p>
                <strong>Posted By:</strong> {selectedResource.postedBy}
              </p>
              <p>
                <strong>Email:</strong> {selectedResource.email}
              </p>
              <p>
                <strong>Description:</strong> {selectedResource.description}
              </p>
              <p>
                <strong>Type:</strong> {selectedResource.type}
              </p>
              <p>
                <strong>Category:</strong> {selectedResource.category}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
