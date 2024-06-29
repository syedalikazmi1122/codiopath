import React from "react";

export default function Home() {
    const imagepath ="./images/code.png"
    const vediopath = "./images/codingvedio.mp4";
  return (
    <div className="space-y-3">
      <div
        className="grid sm:flex p-4 w-full justify-around"
        style={{ backgroundColor: "#29306B" }}
      >
        <div className="  items-center flex">
          {/*for text  */}
          <span>
            <h1 className="text-white w-80  text-left text-lg sm:text-4xl ">
              Ultimate Computer learning Resources <br></br> for you!
            </h1>
            <p className="text-white text-xs sm:text-sm">
              from coders for coders
            </p>
          </span>
        </div>
        <div className="hover:-translate-x-2 hover:-translate-y-2 duration-500">
          {/* for image  */}
          <img src={imagepath} alt="code" className="w-56 sm:w-96" />
        </div>
      </div>
      <div className=" sm:flex w-full  justify-around">
        <div>
          {/* <img src={imagepath} alt="code" className="w-96" /> */}
          {/* for vedio  */}
          <video width="320" height="240" controls autoPlay muted loop>
            <source src={vediopath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-center items-center">
          {/* for button */}
          <button
            style={{ backgroundColor: "#29306B" }}
            className=" w-48 hover:translate-x-2 ho duration-300  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
 