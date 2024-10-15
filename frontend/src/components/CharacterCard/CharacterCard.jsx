import React from "react";
import "./CharacterCard.css";

const CharacterCard = ({ name, description, onClick }) => {
   return (
      <div className="characterCard" onClick={onClick}>
         <div className="character-image"></div>
         <div className="character-text">
            <div className="character-name">{name}</div>
            <div className="character-description">{description}</div>
         </div>
      </div>
   );
};

export default CharacterCard;
