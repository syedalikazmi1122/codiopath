import React from "react";
import { Link as RouterLink } from "react-router-dom";
import css from "./nav.module.css";

export default function NavbarEntity({ name, link, imageaddress, onClick }) {
  return (
    <div
      className={`${css.hoverEffect} border rounded-full p-2  hover:translate-y-1 hover:translate-x-3 duration-100 mt-2`}
      onClick={onClick}
      style={{ backgroundColor: "#29306B" }}
    >
      {imageaddress ? (
        <RouterLink to={link} className="flex items-center">
          <img
            src={imageaddress}
            alt={name}
            style={{ marginRight: "8px" }}
            className="w-5 h-5"
          />
        </RouterLink>
      ) : (
        <RouterLink
          className="text-sm sm:text-base text-white mx-2"
          to={link}
        >
          {name}
        </RouterLink>
      )}
    </div>
  );
}