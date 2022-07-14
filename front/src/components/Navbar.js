import "../App.css";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
    };
  };
  return (
    <nav className="nav__welcome">
      <div className="nav__welcome--NavLinks">
        <NavLink style={navLinkStyles} to="/">
          {" "}
          Acceuil{" "}
        </NavLink>
        <NavLink style={navLinkStyles} to="/search">
          {" "}
          Recherche{" "}
        </NavLink>
        {/* <NavLink to="/Test"> Test </NavLink> */}
        {/* <NavLink to="/ListingDesAlbums"> Listing des albums </NavLink>

        <NavLink to="/ListingDesGenres"> Listing des genres </NavLink>

        <NavLink to="/ListingDesArtistes"> Listing des artistes </NavLink>

        <NavLink to="/DetailsDesAlbums"> Détail d'un album </NavLink> */}
      </div>
    </nav>
  );
}
