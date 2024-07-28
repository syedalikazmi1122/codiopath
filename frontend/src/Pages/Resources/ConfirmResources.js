import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import sendRequest from "../../Apicalls/SendData";

export default function ConfirmResources() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  // Function to fetch resources
  const fetchData = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const response = await sendRequest("GET", "/Approvalresources/");
      console.log("API Response:", response);
      const data = Array.isArray(response) ? response : response.resources;
      console.log("Processed Data:", data);
      setResources(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setIsLoading(false); // Set loading to false if there's an error
      console.log("The error is:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleCloseOverlay = () => {
    setSelectedResource(null);
  };

  const handleApprove = async (e, id) => {
    e.stopPropagation();
    try {
      await sendRequest("PUT", `/resources/${id}`, { status: "approved" });
      console.log(`Approved resource with id: ${id}`);
      await fetchData(); // Refresh resources after approval
    } catch (error) {
      console.log("Approval error:", error);
    }
  };

  const handleReject = async (e, id) => {
    e.stopPropagation();
    try {
      await sendRequest("PUT", `/resources/${id}`, { status: "rejected" });
      console.log(`Rejected resource with id: ${id}`);
      await fetchData(); // Refresh resources after rejection
    } catch (error) {
      console.log("Rejection error:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl mb-6 text-center" style={{ color: "#29306B" }}>
          Manage Resources
        </h1>
        <div className="grid gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2
              className="text-2xl mb-3 text-center"
              style={{ color: "#29306B" }}
            >
              Approved Courses
            </h2>
            <div className="flex justify-center mb-3">
              <input
                type="text"
                placeholder="Search Approved Courses"
                className="w-full sm:w-3/4 p-2 text-sm sm:text-base border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                resources
                  .filter((r) => r.status === "approved")
                  .map((resource) => (
                    <div
                      key={resource._id}
                      className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
                      onClick={() => handleRowClick(resource)}
                    >
                      <div>
                        <h3
                          className="text-xl font-semibold"
                          style={{ color: "#29306B" }}
                        >
                          {resource.ResourceTitle}
                        </h3>
                        <p className="text-sm">{resource.ResourceDescription}</p>
                      </div>
                      <div className="flex space-x-3">
                        <FaCheck
                          className="text-green-500 cursor-pointer"
                          onClick={(e) => handleApprove(e, resource._id)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={(e) => handleReject(e, resource._id)}
                        />
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2
              className="text-2xl mb-3 text-center"
              style={{ color: "#29306B" }}
            >
              Pending Courses
            </h2>
            <div className="flex justify-center mb-3">
              <input
                type="text"
                placeholder="Search Pending Courses"
                className="w-full sm:w-3/4 p-2 text-sm sm:text-base border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                resources
                  .filter((r) => r.status === "pending")
                  .map((resource) => (
                    <div
                      key={resource._id}
                      className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
                      onClick={() => handleRowClick(resource)}
                    >
                      <div>
                        <h3
                          className="text-xl font-semibold"
                          style={{ color: "#29306B" }}
                        >
                          {resource.ResourceTitle}
                        </h3>
                        <p className="text-sm">{resource.ResourceDescription}</p>
                      </div>
                      <div className="flex space-x-3">
                        <FaCheck
                          className="text-green-500 cursor-pointer"
                          onClick={(e) => handleApprove(e, resource._id)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={(e) => handleReject(e, resource._id)}
                        />
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {selectedResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={handleCloseOverlay}
              >
                <FaTimes />
              </button>
              <h2 className="text-2xl mb-4" style={{ color: "#29306B" }}>
                {selectedResource.ResourceTitle}
              </h2>
              <p>
                <strong>Posted By:</strong> {selectedResource.Postername}
              </p>
              <p>
                <strong>Email:</strong> {selectedResource.Posteremail}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedResource.ResourceDescription}
              </p>
              <p>
                <strong>Type:</strong> {selectedResource.ResourceType}
              </p>
              <p>
                <strong>Category:</strong> {selectedResource.ResourceCategory}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array(4)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
          >
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex space-x-3">
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

