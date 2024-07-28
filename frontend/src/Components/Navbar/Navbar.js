import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import useLoginStore from "../../Zustand/Loginstore";
import css from "./nav.module.css";
import NavbarEntity from "./NavbarEntity"; // Assuming NavbarEntity is in the same directory

export default function Navbar() {
  const { isAuthenticated, logout } = useLoginStore(); // Get the isAuthenticated state and logout function from the store
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Adjust the cookie name and path if necessary
    logout();
    setIsMenuOpen(false);
  };

  const logo = "/icons/codiopathlogo.png";
  const links = [
    { name: "See Resources", link: "/see-resources" },
    { name: "Post Resources", link: "/post-resources" },
    { name: "Categories", link: "/categories" },
    { name: "Contact us", link: "/contact-us" },
  ];

  return (
    <nav className="flex items-center  justify-between  bg-gray-100 p-4">
      <RouterLink to="/">
        <img src={logo} alt="Codiopath" className="w-12 h-12" />
      </RouterLink>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex space-x-4">
          {links.map((link) => (
            <NavbarEntity key={link.name} name={link.name} link={link.link} />
          ))}
        </div>
      </div>

      <div className="hidden md:flex space-x-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="btn-logout border p-2   rounded-full text-white "
            style={{ backgroundColor: "#29306B" }}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn-logout border p-2 mt-2  rounded-full hover:translate-y-1 hover:translate-x-3 duration-100 text-white "
            style={{ backgroundColor: "#29306B" }}
          >
            <RouterLink className="text-sm" to="/admin-login">
              Login
            </RouterLink>
          </button>
        )}
      </div>

      <button
        className="md:hidden text-xl"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      <div
        className={`fixed inset-0 bg-gray-100 bg-opacity-75 z-20 transform ${
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
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn-logout border p-2   rounded-full text-white "
              style={{ backgroundColor: "#29306B" }}
            >
              Logout
            </button>
          ) : (
            <NavbarEntity
              name="Login"
              link="/admin-login"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
