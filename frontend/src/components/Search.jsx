import React, { useState, useRef } from "react";
import axios from "axios";
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
        `https://127.0.0.1:8000/api/products?name=${encodeURIComponent(search)}`
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
      <form role="search">
        <input
          className="form-control w-25 m-2 outline-none border rounded border-gray-200 h-10 px-2"
          type="search"
          placeholder="Entrez votre recherche"
          aria-label="Search"
          onChange={handleChange}
        />
      </form>

      {state.searching && (
        <div className="search-results">
          <ul>
            {!state.loading ? (
              state.datas.length > 0 ? (
                <>
                  {state.datas.map((item, index) => {
                    return (
                      <li key={index}>
                        <a href={`product/${item.id}`} className=" ">
                          <Highlighter
                            highlightClassName="highlistClass"
                            searchWords={maRecherche.split(" ")}
                            autoEscape={true}
                            textToHighlight={item.name}
                          />
                        </a>
                      </li>
                    );
                  })}
                  <button style={{ textAlign: "right", cursor: "pointer" }}>
                    <a
                      href={`product/search/${encodeURIComponent(maRecherche)}`}
                    >
                      Voir plus...
                    </a>
                  </button>
                </>
              ) : (
                <li>Aucun résultats</li>
              )
            ) : (
              <li>Chargement en cours</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
