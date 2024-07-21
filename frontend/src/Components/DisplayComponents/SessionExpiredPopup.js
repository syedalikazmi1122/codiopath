import React from "react";

const SessionExpiredPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Session Expired</h2>
        <p>Your session has expired. Please log in again.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SessionExpiredPopup;
