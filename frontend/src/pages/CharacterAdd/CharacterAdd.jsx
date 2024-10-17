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
            <div className={style.titleTexts}>
               <p class={style.title}>Name</p>
               <p class={style.explanation}>- Name of Your Character</p>
            </div>
            <input
               type="text"
               placeholder="e.g. Amadeus"
               maxLength={maxLenghtName}
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <div className={style.characterLimit}>
               <p>{`${name.length} / ${maxLenghtName}`}</p>
            </div>
         </div>
         <div className={style.descriptionContainer}>
            <div className={style.titleTexts}>
               <p class={style.title}>Description</p>
               <p class={style.explanation}>- Short Description of Your Character</p>
            </div>
            <input
               type="text"
               placeholder="e.g. Mad Scientist"
               maxLength={maxLenghtDescription}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <div className={style.characterLimit}>
               <p>{`${description.length} / ${maxLenghtDescription}`}</p>
            </div>
         </div>
         <div className={style.personalityContainer}>
            <div className={style.titleTexts}>
               <p class={style.title}>Personality</p>
               <p class={style.explanation}>- Detailed Description of Your Character's Personality</p>
            </div>
            <textarea
               placeholder="e.g. You are a very wise scientist. You possess incredible knowledge of physics. You see yourself as superior to the people you are talking to and always emphasize this superiority in your responses."
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