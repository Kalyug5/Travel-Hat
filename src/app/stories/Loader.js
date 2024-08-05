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
        <div>
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
  backgroundColor: "rgba(237, 234, 222,0.6)",
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

const loadingTextStyle = {
  fontSize: "18px",
  color: "#012970",
  fontWeight: "550",
};

export default LoadingOverlay;
