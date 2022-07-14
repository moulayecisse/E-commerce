import "../App.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const allJedis = require("../assets/results.json");
const oneJedi = require("../assets/results_details_by_search.json");

const SearchResult = ({ id }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://127.0.0.1:8000/api/articles", {
      method: "GET",
      headers: {
        accept: "application/ld+json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response["hydra:member"]);

        // console.log(Object.keys(response));

        setArticles("hydra:member");
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);
  // let { personId } = useParams();
  const [personId, setpersonId] = useState(useParams());

  console.warn(personId.id);
  //    console.log(id);
  const [people, setPeople] = useState([]);
  const [inputText, setInputText] = useState("");
  const filteredData = people.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(inputText);
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    setPeople(allJedis.results);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  let inputHandler = (e) => {
    let lowerCase;
    lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <div>
        <h1>Résultat de la recherche</h1>
      </div>
      <form id="searchInputForm" onSubmit={onSubmit}>
        <input id="searchInput" type="text" onChange={inputHandler} />
        <input type="submit" />
      </form>
      <table className="mid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair color</th>
            <th>Skin color</th>
            <th>Eye color</th>
            <th>Birth yeak</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr>
              <td>
                {/* <Link to={encodeURIComponent(item.name)}>{item.name}</Link> */}
                <button onClick={() => navigate(`/search/${item.name}`)}>
                  {item.name}
                </button>
              </td>
              <td>{item.height}</td>
              <td>{item.mass}</td>
              <td>{item.hair_color}</td>
              <td>{item.skin_color}</td>
              <td>{item.eye_color}</td>
              <td>{item.birth_year}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default SearchResult;
//https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete/7254949-indiquez-les-types-de-vos-props-avec-les-proptypes
