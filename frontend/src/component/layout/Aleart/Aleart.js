import React, { useEffect, useState } from "react";
import "./Aleart.css";

function Alert({ message }) {

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showAlert && (
        <div className="custom-alert">
          <div className="custom-alert-content">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
