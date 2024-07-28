import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <div
      className=" sm:h-56 p-2 items-end text-white"
      style={{ backgroundColor: "#29306B" }}
    >
      <span className="flex justify-between">
        <p className="p-2 text-sm">
          <span className="font-bold text-base sm:text-lg ">
            A Platform for Computer beginners to help them Start <br />
          </span>
          Some tips and tricks to learn Computer Science
          <ul className="list-disc pl-5">
            <li className="text-sm sm:text-base">Be consistent</li>
            <li className="text-sm sm:text-base">Learn from the basics</li>
            <li className="text-sm sm:text-base">Avoid AI while learning</li>
          </ul>
        </p>

        <div className=" space-y-4 mt-4">
          <p className="text-sm">Lets connect </p>
          <span className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
          </span>
        </div>
      </span>
      <div className="border mt-5"></div>
      <p className="  content-end text-sm mt-4">
        All Rights are Reserved &copy; 2024{" "}
        <span className="font-semibold">Codiopath</span>
      </p>
    </div>
  );
}

export default Footer;