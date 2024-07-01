import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import css from "./nav.module.css";
import NavbarEntity from "./NavbarEntity"; // Assuming NavbarEntity is in the same directory

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logo = "./icons/codiopathlogo.png";
  const links = [
    { name: "See Resources", link: "/see-resources" },
    { name: "Post Resources", link: "/post-resources" },
    { name: "Categories", link: "/categories" },
    { name: "About us", link: "/about-us" },
    { name: "Admin login", link: "/admin-login", alignRight: true },
  ];

  return (
    <nav className="  flex items-center justify-between bg-gray-100 p-4">
      <div className="flex items-center space-x-4">
         <RouterLink to="/">
         <img src={logo} alt="Codiopath" className="w-12 h-12" />
          </RouterLink>
        <div className="hidden md:flex space-x-4">
          {links
            .filter((link) => !link.alignRight)
            .map((link) => (
              <NavbarEntity key={link.name} name={link.name} link={link.link} />
            ))}
        </div>
      </div>

      <div className="hidden md:flex space-x-4">
        {links
          .filter((link) => link.alignRight)
          .map((link) => (
            <NavbarEntity key={link.name} name={link.name} link={link.link} />
          ))}
      </div>

      <button
        className="md:hidden text-xl"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      <div
        className={`fixed inset-0 bg-gray-100  bg-opacity-75 z-20 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} aria-label="Close menu">
            <FaTimes className="text-gray-500 text-2xl" />
          </button>
        </div>
        <div className="flex flex-col items-center mt-8 space-y-4">
          {links.map((link) => (
            <NavbarEntity
              key={link.name}
              name={link.name}
              link={link.link}
              onClick={toggleMenu} // Close the menu on link click
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
