import React , {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import style from "./CharacterSelection.module.css";
import charactersJSON from '../../characters.json';
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

const CharacterSelection = () => {
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);

   useEffect(() => {
      setCharacters(charactersJSON);
      console.log(charactersJSON);
   }, []);

   const handleCharacterSelect = (character) => {
      console.log('Selected character:', character);
      navigate(`/chat/${character.name.toLowerCase()}`, { state: { character } });
   };

   return (
      <div className="container">   
         <div className={style.buttons}>
            <button className={style.button}><FontAwesomeIcon icon={faPlus} /></button>
            <button className={style.button}><FontAwesomeIcon icon={faPenToSquare} /></button>
         </div>
         <div className={style.characterCards}>
            {characters.map((character, index) => (
               <CharacterCard
                  key={index}
                  name={character.name}
                  description={character.description}
                  onClick={() => handleCharacterSelect(character)}
               />
            ))}
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
         </div>
      </div>
   );
};

export default CharacterSelection;