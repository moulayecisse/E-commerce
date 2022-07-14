import "../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const SearchResult = () => {
  const { id } = useParams();
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
export default SearchResult;
