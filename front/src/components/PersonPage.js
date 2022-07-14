import "../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
const oneJedi = require("../assets/results_details_by_search.json");

const SearchResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const test = oneJedi.results;

  let person = test[0];
  console.warn(person);

  let { name, eye_color, birth_year, gender, vehicles, created, edited } =
    person;
  let convert = (date) => {
    const timeStr = date;
    var date = new Date(timeStr);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateStr = day + "/" + month + "/" + year;
    return dateStr;
  };
  let getSpaceShips = (vehicles) => {
    console.warn(vehicles);
    let spaceShips = [];
    vehicles.forEach((vehicle) => {
      spaceShips.push(vehicle);
    });
    return spaceShips;
  };

  console.log(getSpaceShips(vehicles)); // ''

  // console.log(name, eye_color, birth_year, gender, vehicles, created, edited); // ''

  // console.warn(eye_color);
  return (
    <>
      <div>
        <h1>Jedi details of #{id}</h1>
      </div>

      <table className="mid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Eye color</th>
            <th>Birth yeak</th>
            <th>Gender</th>
            <th>Vehicles</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          {test.map((item) => (
            <tr>
              <td>
                {/* <Link to={encodeURIComponent(item.name)}>{item.name}</Link> */}
                <button onClick={() => navigate(`/search/${item.name}`)}>
                  {item.name}
                </button>
              </td>
              <td>{item.eye_color}</td>
              <td>{item.birth_year}</td>
              <td>{item.gender}</td>
              <td>{item.vehicles}</td>
              <td>{convert(created)}</td>
              <td>{convert(edited)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
