import react from "react";
import sendRequest from "../../Apicalls/SendData";
export default function Postaresource() {
  const [resource, setResource] = react.useState({
    title: "",
    category: "",
    url: "",
    type: "",
    name: "",
    email: "",
    description: "",
  });
  const handleChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     const response = await sendRequest("/resources", "post", resource);
     console.log(response);
    if (response.message === "Resource submitted successfully") {
      alert("posted");
    }
    }
  const imageaddress = "./images/postaresource.jpg";
  return (
    <>
      <div className="w-full h-full p-5  sm:h-screen flex justify-center items-center">
        <div className="flex  w-full h-2/3 sm:w-fit p-2 justify-center border ">
          <div className="flex h-full">
            <img src={imageaddress} className="h-full hidden sm:block " />
          </div>
          <div className="grid ">
            <h1
              className=" text-center  font-semibold text-2xl"
              style={{ color: "#29306B" }}
            >
              Post a Resource
            </h1>
            <form onSubmit={handleSubmit} className="grid justify-center">
              {/* Title and category */}
              <div className="grid sm:flex  space-x-2">
                <input
                  type="text"
                  name="ResourceTitle"
                  onChange={handleChange}
                  placeholder="Enter Resource Title"
                  className="border p-2 m-2 w-full sm:w-2/3"
                />
                <input
                  type="text"
                  name="ResourceCategory"
                  onChange={handleChange}
                  placeholder="Enter Resource Category"
                  className="border p-2 m-2 w-full sm:w-2/3"
                />
              </div>
              {/* URL */}
              <div className="flex ">
                <input
                  type="text"
                  onChange={handleChange}
                  name="ResourceLink"
                  placeholder="Enter Resource URL"
                  className="border p-2 m-2 w-full sm:w-52 "
                />
                <select
                  name="ResourceType"
                  onChange={handleChange}
                  className="border p-1 mt-2 text-gray-400 w-full sm:w-2/3"
                >
                  <option
                    onChange={handleChange}
                    value="none"
                    className="text-sm"
                  
                  >
                    Select Type
                  </option>
                  <option
                    onChange={handleChange}
                    value="youtubevedio"
                    className="text-sm"
                  >
                    Youtube vedio
                  </option>
                  <option
                    onChange={handleChange}
                    value="paidcourse"
                    className="text-sm"
                  >
                    Paid Course
                  </option>
                  <option
                    onChange={handleChange}
                    value="blogwebsite"
                    className="text-sm"
                  >
                    Blog Website
                  </option>
                </select>
              </div>

              {/* Name and email  */}
              <div className="grid sm:flex  space-x-2">
                <input
                  type="text"
                  name="Posteremail"
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="border p-2 m-2 w-full sm:w-2/3"
                />
                <input
                  type="text"
                  name="Postername"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="border p-2 m-2 w-full sm:w-2/3"
                />
              </div>
              <div className="flex justify-center w-full">
                <textarea
                  name="ResourceDescription"
                  onChange={handleChange}
                  placeholder="Enter Resource Description"
                  className="border p-2 pr-1 w-full h-32 "
                />
              </div>
              <div className="flex mt-10 justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
