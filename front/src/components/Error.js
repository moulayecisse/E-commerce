import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Error 404 !</h1>
      <button
        onClick={() => navigate(-1)}
        variant={"outlined"}
        color={"primary"}
      >
        Go back
      </button>
    </>
  );
};
