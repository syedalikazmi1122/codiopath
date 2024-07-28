import React from "react";
import PropTypes from "prop-types";

const Popup = ({ message, type }) => {
  if (!message) return null;

  const popupStyle = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${popupStyle}`}
    >
      {message}
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error"]),
};

Popup.defaultProps = {
  message: "",
  type: "error",
};

export default Popup;
