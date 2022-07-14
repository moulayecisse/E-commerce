import React from "react";
import "./HomeDefault.css";
import { LogoStarWars } from "../../assets";
// import { Mariadb } from "../../DB";

// console.warn( Mariadb )
const HomeDefault = () => {
  return (
    <div className="home-prosper">
      <div className="home-item1">
        <h1 className="home-item1__header">My SWAPI</h1>
        <i className="home-item1__paragraph1">The Star Wars API </i>
      </div>
      <div className="home-item2">
        <div className="home-item2__photo">
          {/* <img
            className="home-item2__photo-img"
            src={MySpotify480}
            alt="Team"
          /> */}
          <img
            className="home-item2__photo-circle"
            src={LogoStarWars}
            // width="96"
            // height="65"
            alt="Circle"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeDefault;
