import React, { useState } from "react";
import style from "./CharacterAdd.module.css";
import { addCharacter, uploadAvatar } from "../../services/characterService";

const CharacterAdd = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [personality, setPersonality] = useState('');
   const [emotions, setEmotions] = useState([]);
   const [customAvatar, setCustomAvatar] = useState(0);

   const maxLenghtName = 20;
   const maxLenghtDescription = 35;
   const maxLenghtPersonality = 500;

   const handleCustomAvatarSelection = (event) => {
      setCustomAvatar(event.target.value === 'yes' ? 1 : 0); //if selection box is "yes" then customAvatar equal to 1 (which means true)
   };

   const customAvatarFileChange = (event, labelId) => {
      const fileInput = event.target;
      const label = document.querySelector(`#${labelId}`);
      const allowedTypes = ['image/png'];

      label.innerHTML = label.innerHTML.replace(' ✔', '');

      if (fileInput.files.length === 0) {
         alert("Please Select a Avatar!");
         setEmotions(emotions.filter(emotion => emotion !== label.innerHTML.toLowerCase()));
         return;
      }

      if (fileInput.files.length > 1) {
         alert("Only 1 avatar per emotion!");
         setEmotions(emotions.filter(emotion => emotion !== label.innerHTML.toLowerCase()));
         return;
      }

      const fileType = fileInput.files[0].type;
      if (!allowedTypes.includes(fileType)) {
         alert("Only .png type is supported");
         fileInput.value = "";
         return;
      }

      const currentEmotion = label.innerHTML.toLowerCase();
      setEmotions(prevEmotions => {
         const updatedEmotions = prevEmotions.filter(emotion => emotion !== currentEmotion);
         if(!updatedEmotions.includes(currentEmotion)) {
            updatedEmotions.push(currentEmotion);
         }
         return updatedEmotions;
      });

      label.innerHTML += ' ✔';
   };

   const handleAddCharacter = async () => {
      if (name.trim() === "" || description.trim() === "" || personality.trim() === "") {
         alert("Character name, description, and personality must not be empty!");
         return;
      }

      // if custom avatar is selected, verify that at least 1 avatar has been uploaded
      if (customAvatar === 1) {
         const emotionTypes = ["normal", "happy", "sad", "angry"];

         const hasFileUploaded = emotionTypes.some(emotion => {
            const fileInput = document.getElementById(`${emotion}-upload`);
            return fileInput.files.length > 0;
         });

         if (!hasFileUploaded) {
            alert("Please upload at least one avatar for your character!");
            return;
         }
      }

      const newCharacter = {
         name,
         description,
         personality,
         emotions: customAvatar === 1 ? emotions : ["normal", "happy", "sad", "angry"],
         customAvatar
      };

      try {
         await addCharacter(newCharacter);
         console.log("Character added successfully!");

         if (customAvatar === 1) {
            const formData = new FormData();
            formData.append("characterName", newCharacter.name);
            formData.append("customAvatar", newCharacter.customAvatar);
            emotions.forEach(emotion => {
               const fileInput = document.getElementById(`${emotion}-upload`);
               if (fileInput.files.length > 0) {
                  formData.append("avatars", fileInput.files[0], `${emotion}.png`);
               }
            });
            await uploadAvatar(formData);
            console.log("Character avatars uploaded successfully!");
         } else console.log(`custom avatar value of '${newCharacter.name}' is ${newCharacter.customAvatar}, default avatar is used`);

         alert("Character added successfully!");
         window.location.reload();
      } catch (error) {
         console.error("Error:", error.message);
         alert("Failed to add character!");
      }
   };

   return (
      <div className={style.container}>
         <div className={style.nameContainer}>
            <div className={style.titleTexts}>
               <label className={style.title}>Name</label>
               <label className={style.explanation}>- Name of Your Character</label>
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
               <label className={style.title}>Description</label>
               <label className={style.explanation}>- Short Description of Your Character</label>
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
               <label className={style.title}>Personality</label>
               <label className={style.explanation}>- Detailed Description of Your Character's Personality</label>
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
         <div className={style.customAvatarContainer}>
            <label className={style.customAvatarLabel}>Do you want to upload custom avatar for your character?</label>
            <select className={style.customAvatarSelection} onChange={handleCustomAvatarSelection} defaultValue="no">
               <option value="no">No</option>
               <option value="yes">Yes</option>
            </select>
         </div>
         {/* Avatar Upload Section (Hidden by Default) */}
         <div className={`${style.fileUploadContainer} ${customAvatar ? style.visible : style.hidden}`}>
            <label>Emotions for your character's avatar:</label>
            <div className={style.fileUploadInnerContainer}>
               <label id="normal-label">Normal</label>
               <label className={`${style.customFileUpload}`} htmlFor="normal-upload">Choose File</label>
               <input type="file" id="normal-upload" onChange={(event) => customAvatarFileChange(event, 'normal-label')} accept="image/*" />
            </div>
            <div className={style.fileUploadInnerContainer}>
               <label id="happy-label">Happy</label>
               <label className={`${style.customFileUpload}`} htmlFor="happy-upload">Choose File</label>
               <input type="file" id="happy-upload" onChange={(event) => customAvatarFileChange(event, 'happy-label')} accept="image/*" />
            </div>
            <div className={style.fileUploadInnerContainer}>
               <label id="sad-label">Sad</label>
               <label className={`${style.customFileUpload}`} htmlFor="sad-upload">Choose File</label>
               <input type="file" id="sad-upload" onChange={(event) => customAvatarFileChange(event, 'sad-label')} accept="image/*" />
            </div>
            <div className={style.fileUploadInnerContainer}>
               <label id="angry-label">Angry</label>
               <label className={`${style.customFileUpload}`} htmlFor="angry-upload">Choose File</label>
               <input type="file" id="angry-upload" onChange={(event) => customAvatarFileChange(event, 'angry-label')} accept="image/*" />
            </div>
         </div>
         <button className={style.addButton} onClick={handleAddCharacter}>ADD</button>
      </div>
   );
};

export default CharacterAdd;