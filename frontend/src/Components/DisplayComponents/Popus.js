import React from "react";
import PropTypes from "prop-types";

const PopUp = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <p className="text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUp;
