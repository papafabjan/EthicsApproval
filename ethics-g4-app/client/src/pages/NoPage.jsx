import React from "react";
import { Link } from "react-router-dom";
const NoPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>404 - Not Found</h1>
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NoPage;
