import React from "react";
import { Link as RouterLink } from "react-router-dom";
import css from "./nav.module.css";

export default function NavbarEntity({ name, link, imageaddress, onClick }) {
  return (
    <div className={`${css.hoverEffect} mt-2`} onClick={onClick}>
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
        <RouterLink className="text-sm sm:text-lg text-blue-800 mx-2" to={link}>
          {name}
        </RouterLink>
      )}
    </div>
  );
}