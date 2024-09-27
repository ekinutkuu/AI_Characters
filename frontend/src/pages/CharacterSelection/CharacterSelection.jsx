import React from "react";
import style from "./CharacterSelection.module.css";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

const CharacterSelection = () => {
   return (
      <div className="container">   
         <div className={style.buttons}>
            <button className={style.button}><FontAwesomeIcon icon={faPlus} /></button>
            <button className={style.button}><FontAwesomeIcon icon={faPenToSquare} /></button>
         </div>
         <div className={style.characterCards}>
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
         </div>
      </div>
   );
};

export default CharacterSelection;