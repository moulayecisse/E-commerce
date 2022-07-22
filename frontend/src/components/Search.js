import React, { useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Highlighter from "react-highlight-words";

const Search = () => {
  const [state, setState] = useState({
    // un objet qui contient mes variables d'états (1 variable d'état avec plusieurs clés)
    searching: false, // le paramètre qui me permet de savoir si je suis en train de chercher quelque chose
    loading: true, // permet d'indiquer à l'utilisateur que la recherche est en cours
    datas: {
      // objet qui va contenir mes données
      products: [], // tableau retourné lors de la requête
    },
  });

  const [maRecherche, setMaRecherche] = useState("");

  let timerRef = useRef(); //ma référence de setTimeout

  const handleRequest = async (search) => {
    try {
      const res = await axios.get(
        `https://localhost:8000/api/products?name=${encodeURIComponent(search)}`
      );
      console.log(res.data["hydra:member"]);
      setState((state) => ({
        ...state,
        loading: false,
        datas: res.data["hydra:member"],
      }));
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    // à chaque changement de l'input
    let value = e.target.value; // je récupère la valeur de l'input
    setMaRecherche(value);
    clearTimeout(timerRef.current); //j'annule le précédent timeout (debounce)
    if (value && value.length >= 3) {
      // s'il y a au moins une lettre dans l'input on va effectuer la recherche
      setState({ ...state, searching: true, loading: true }); // on affiche avec le searching la div, et on indique à l'utilisateur qu'il est en train de chercher à l'aide du loading = true
      timerRef.current = setTimeout(() => {
        //on lance le timeout de la recherche
        handleRequest(value); //on appelle la fonction faisant la recherche en lui envoyant le texte de l'input
      }, 1000);
    } else {
      // s'il n'y a pas de texte dans l'input
      setState({ ...state, searching: false, loading: false }); // on ne cherche plus, on ferme la div
      //   setState((state) => ({ ...state, searching: false }));
    }
  };

  return (
    <>
      <div className="relative w-[560px]">
        <form class="order-first mb-10 md:order-last md:mb-0 md:pr-8" action="">
          <input
            className="mw-72 rounded-full py-1 pl-3 pr-10 focus:outline-0"
            type="search"
            placeholder="Recherche"
            onChange={handleChange}
          />
          <button class=" bg-trasparent -ml-8" type="submit">
            <i class="fa fa-search text-gray-400"></i>
          </button>
        </form>

        {state.searching && (
          <ul className="absolute top-[50px] left-0 right-0 z-10 max-h-[200px] list-none overflow-y-scroll bg-white shadow-md">
            {state.loading ? (
              <li className="bg-green-100 py-2 px-4 transition-colors">
                Chargement en cours
              </li>
            ) : state.datas.length > 0 ? (
              <>
                {state.datas.map((item, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        className="cursor-pointer py-2 px-4 transition-colors hover:bg-gray-500 hover:text-white"
                      >
                        <img
                          src={`https://localhost:8000${item.image.contentUrl}`}
                          alt={item.name}
                          style={{ width: "3rem" }}
                        />
                        <NavLink
                          to={`/product/${item.id}`}
                          className="w-1/2 underline"
                        >
                          <Highlighter
                            highlightClassName="highlistClass"
                            searchWords={maRecherche.split(" ")}
                            autoEscape={true}
                            textToHighlight={item.name}
                          />
                        </NavLink>
                        <span> {item.price} €</span>
                      </li>
                    </>
                  );
                })}
                <button
                  className="text- indigo-500 visited:text- indigo-500 underline hover:text-blue-800"
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  <NavLink
                    to={`/product/search?name=${encodeURIComponent(
                      maRecherche
                    )}`}
                  >
                    Voir plus...
                  </NavLink>
                </button>
              </>
            ) : (
              <li className="bg-red-100 py-2 px-4 transition-colors">
                Aucun résultats
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
