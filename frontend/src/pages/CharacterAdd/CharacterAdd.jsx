import React, { useState } from "react";
import style from "./CharacterAdd.module.css";

const CharacterAdd = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [personality, setPersonality] = useState('');

   const maxLenghtName = 20;
   const maxLenghtDescription = 35;
   const maxLenghtPersonality = 500;

   return (
      <div className={style.container}>
         <div className={style.nameContainer}>
            <p>Name</p>
            <input
               type="text"
               placeholder="Name of Your Character - e.g. Amadeus"
               maxLength={maxLenghtName}
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <div className={style.characterLimit}>
               <p>{`${name.length} / ${maxLenghtName}`}</p>
            </div>
         </div>
         <div className={style.descriptionContainer}>
            <p>Description</p>
            <input
               type="text"
               placeholder="Short Description of Your Character - e.g. Mad Scientist"
               maxLength={maxLenghtDescription}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <div className={style.characterLimit}>
               <p>{`${description.length} / ${maxLenghtDescription}`}</p>
            </div>
         </div>
         <div className={style.personalityContainer}>
            <p>Personality</p>
            <textarea
               placeholder="Detailed Description of Your Character's Personality - e.g. You are a very wise scientist. You possess incredible knowledge of physics. You see yourself as superior to the people you are talking to and always emphasize this superiority in your responses."
               maxLength={maxLenghtPersonality}
               value={personality}
               onChange={(e) => setPersonality(e.target.value)}
            />
            <div className={style.characterLimit}>
               <p>{`${personality.length} / ${maxLenghtPersonality}`}</p>
            </div>
         </div>
         <button className={style.addButton}>ADD</button>
      </div>
   );
};

export default CharacterAdd;