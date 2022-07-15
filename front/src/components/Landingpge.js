import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Landingpge = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      This is landing page.
      {loggedIn ? <Navigate to="/login" /> : <Navigate to="/list" />}
    </div>
  );
};
export default Landingpge;
