import React from "react";
import "./CharacterCard.css";

const CharacterCard = () => {
   return (
      <div className="characterCard">
         <div className="character-image"></div>
         <div className="character-text">
            <div className="character-name">Amadeus</div>
            <div className="character-description">Talk with virtual personality</div>
         </div>
      </div>
   );
};

export default CharacterCard;
