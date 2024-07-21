import react from "react";
import { Link as RouterLink } from "react-router-dom";
const resources = [
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
  {
    title: "Resource Title",
    description: "Resource Description",
    category: "C++",
  },
];
export default function Viewresources() {
  return (
    <>
      <div className=" p-4">
        {/* the main heading */}
        <div className="flex  justify-between p-2">
          <h1
            className="text-3xl sm:text-2xl font-medium"
            style={{ color: "#29306B" }}
          >
            Resources
          </h1>
          <button
            className="border h-9 p-2 text-white  bg-blue-900 rounded-md hover:translate-x-0.5 hover:translate-y-1 duration-300"
            style={{ fontFamily: "" }}
          >
            <RouterLink to="/post-resources">Add Resources</RouterLink>
          </button>
        </div>
        {/* the buttons and the search  */}
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search here"
            className="border p-2 m-2 placeholder:text-center rounded  w-5/12"
          />
          <div className="flex items-center space-x-3">
            <button
              className="border h-9 p-2 rounded-md text-white hover:translate-x-2 hover:translate-y-1 duration-300  bg-blue-900"
              // style={{ backgroundColor: "#29306B" }}
            >
              Search by Category
            </button>
            <button
              className="border h-9 p-2 text-white rounded-md hover:translate-x-2 hover:translate-y-1 duration-300  bg-blue-900"
              // style={{ backgroundColor: "#29306B", fontFamily: "" }}
            >
              Search by name
            </button>
          </div>
        </div>
        {/* the resources */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources.map((resource) => (
            <RouterLink to="/see-each-resources">
              <div
                className="border hover:translate-y-0.5 hover:translate-x-0.5 duration-200  rounded-md p-4"
                style={{ backgroundColor: "#29306B" }}
              >
                <h1 className="text-2xl text-white font-medium">
                  {resource.title}
                </h1>
                <p className="text-white">{resource.description}</p>
              </div>
            </RouterLink>
          ))}
          <div
            className="border rounded-md p-4"
            style={{ backgroundColor: "#29306B" }}
          >
            <h1 className="text-2xl text-white font-medium">Resource Title</h1>
            <p className="text-white">Resource Description</p>
          </div>
        </div>
      </div>
    </>
  );
}
