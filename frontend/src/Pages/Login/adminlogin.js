import React from "react";

export default function adminlogin() {
  console.log("Admin login page");
  const imagepath = "./icons/codiopathlogowhite.png";
  const mobileimagepath = "./icons/codingbars.png";
  return (
    <div className="flex h-screen justify-center pt-10">
      <div className="border  h-80  sm:w-1/3 sm:h-96 rounded-lg block sm:flex ">
        <div className="  p-4 sm:block flex justify-center items-center   " style={{ backgroundColor: "#29306B" }}>
          <img src={imagepath} className=" hidden sm:block h-40 sm:h-48 " />
          <p
            style={{ fontFamily: "cursive" }}
            className="text-white  text-center  font-medium text-xl"
          >
            {"<Welcome back/>"}
          </p>
        </div>
        <div className="p-4 ">
          <h1
            className=" text-3xl  font-medium"
            style={{ color: "#29306B", fontFamily: "cursive" }}
          >
            Admin Login
          </h1>
          <div className="space-y-5 p-0 sm:p-5 mt-6 ">
            <div className=" text-left  w-40">
              <label style={{ color: "#29306B" }} className="text-sm">
                Email
              </label>
              <input type="email" className="bg-gray-100 w-40  rounded-sm" />
            </div>
            <div className="text-left  w-28 sm:w-40">
              <label className="text-sm" style={{ color: "#29306B" }}>
                Password
              </label>
              <input
                type="password"
                className="w-40 bg-gray-100"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="hover:translate-x-2  duration-150 p-2 rounded-sm text-white "
                style={{ backgroundColor: "#29306B" }}
              >
                {" "}
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
