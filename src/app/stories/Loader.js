import React from "react";
import { useLoader } from "./LoaderContext";
import "../styles/Card.css";

const LoadingOverlay = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div style={overlayStyle}>
      <div style={spinnerContainer}>
        <div className="loader"></div>
        <div style={textContainerStyle}>
          <span style={loadingTextStyle}>Loading...</span>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const spinnerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const textContainerStyle = {
  marginTop: "10px",
  backgroundColor: "white",
  padding: "5px 20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const loadingTextStyle = {
  fontSize: "16px",
  color: "#012970",
};

export default LoadingOverlay;
