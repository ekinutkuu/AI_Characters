import React, { useState } from "react";
import style from "./CharacterAdd.module.css";
import { addCharacter } from "../../services/characterService";

const CharacterAdd = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [personality, setPersonality] = useState('');

   const maxLenghtName = 20;
   const maxLenghtDescription = 35;
   const maxLenghtPersonality = 500;

   const handleAddCharacter = async () => {
      if (name.trim() === "" || description.trim() === "" || personality.trim() === "") {
         alert("Character name, description, and personality must not be empty!");
         return;
      }

      const emotions = [];
      const newCharacter = {
         name,
         description,
         personality,
         emotions
      };

      try {
         await addCharacter(newCharacter);
         alert("Character added successfully!");
         setName('');
         setDescription('');
         setPersonality('');
      } catch (error) {
         console.error("Error:", error.message);
         alert("Failed to add character");
      }
   };

   return (
      <div className={style.container}>
         <div className={style.nameContainer}>
            <div className={style.titleTexts}>
               <p className={style.title}>Name</p>
               <p className={style.explanation}>- Name of Your Character</p>
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
               <p className={style.title}>Description</p>
               <p className={style.explanation}>- Short Description of Your Character</p>
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
               <p className={style.title}>Personality</p>
               <p className={style.explanation}>- Detailed Description of Your Character's Personality</p>
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
         <button className={style.addButton} onClick={handleAddCharacter}>ADD</button>
      </div>
   );
};

export default CharacterAdd;