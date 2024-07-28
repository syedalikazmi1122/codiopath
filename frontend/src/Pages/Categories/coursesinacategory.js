import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sendRequest from "../../Apicalls/SendData";
import { Link as RouterLink } from "react-router-dom";

const ResourcesByCategory = () => {
  const { category } = useParams(); // Get category from URL params
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await sendRequest(
          "GET",
          `/resources/category/${category}`
        );
        setResources(response.resources);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setIsLoading(false); // Set loading to false if there's an error
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, [category]);

  const handleCardClick = (id) => {
    navigate(`/see-each-resources/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "#29306B" }}>
        Resources in "{category}" Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          resources.map((resource) => (
            <div
              key={resource.id} // Use id for the key
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(resource.id)}
            >
              <div className="p-4">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "#29306B" }}
                >
                  {resource.title}
                </h2>
                <p className="text-gray-600 mt-2">{resource.description}</p>
                <div className="mt-4">
                  <RouterLink
                    to={`/see-each-resources/${resource.id}`}
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    View Resource
                  </RouterLink>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

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

export default ResourcesByCategory;
