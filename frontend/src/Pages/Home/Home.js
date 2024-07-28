import React from "react";
import { Link as RouterLink } from "react-router-dom";
export default function Home() {
  const imagepath = "./images/code11.png";
  const imagepath2 = "./images/workinghomepage.png";
  const imagepath3 = "./images/boylying.png";
  const vediopath = "./images/codingvedio.mp4";
  return (
    <div className="bg-white p-6 space-y-4 sm:p-5">
      {/* first box */}
      <div
        className="sm:h-64 p-3 flex-row-reverse sm:flex items-center justify-around border shadow-lg rounded-md"
        style={{ backgroundColor: "GhostWhite" }}
      >
        <span className="space-y-5">
          <p
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: "#29306B" }}
          >
            A computer Science Student ? <br></br> What to learn some thing ?
          </p>

          <p className="text-lg font-medium" style={{ color: "#29306B" }}>
            .......Unable to find Resources
          </p>
        </span>
        <img src={imagepath} alt="code" className="h-56" />
      </div>

      {/* second box */}
      <div
        className="sm:h-64 p-3  sm:flex items-center justify-around border shadow-lg rounded-md"
        style={{ backgroundColor: "GhostWhite" }}
      >
        <span className="space-y-5 justify-center grid">
          <p
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: "#29306B" }}
          >
            Want to learn some thing new ?
          </p>

          <p className="text-lg font-medium" style={{ color: "#29306B" }}>
            .......From development to Artifical Intelligence
          </p>
          <button className="p-2 w-28 ml-10 text-white border rounded-full hover:translate-x-2 hover:translate-y-2 duration-200 gradient-button">
            <RouterLink to="/see-resources">Get started</RouterLink>
            
          </button>
        </span>
        <img src={imagepath3} alt="code" className="" />
      </div>

      {/* third box */}
      {/* <div
        className="sm:h-64 p-3 flex-row-reverse sm:flex items-center justify-around border shadow-lg rounded-md"
        style={{ backgroundColor: "GhostWhite" }}
      >
        <button className="p-2 text-white border rounded-full hover:translate-x-2 hover:translate-y-2 duration-200 gradient-button">
          Get started
        </button>
        <img src={imagepath3} alt="code" className="h-72" />
      </div> */}
    </div>
  );
}
