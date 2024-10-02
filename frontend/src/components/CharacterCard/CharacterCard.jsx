import React from "react";
import { useNavigate } from 'react-router-dom';
import "./CharacterCard.css";

const CharacterCard = () => {

   const navigate = useNavigate();
   const handleClick = () => {
      navigate('/chat');
   };

   return (
      <div className="characterCard" onClick={handleClick}>
         <div className="character-image"></div>
         <div className="character-text">
            <div className="character-name">Amadeus</div>
            <div className="character-description">Talk with virtual personality</div>
         </div>
      </div>
   );
};

export default CharacterCard;
