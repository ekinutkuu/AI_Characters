const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage ({
   destination: (req, file, cb) => {
      const customAvatar = req.body.customAvatar;
      if (customAvatar === '1') {
         const characterName = req.body.characterName;
         const cleanedCharacterName = characterName.trim().replace(/\s+/g, '_');
         dirPath = path.join(__dirname, `../../frontend/public/avatars/${cleanedCharacterName}`);
         // creating a custom folder for uploading avatar images if the character has a custom avatar (/public/avatars/characterName)
         if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Folder created with name '${cleanedCharacterName}'`);
         }
         cb(null, dirPath);
      } else {
         console.log(`Custom avatar creation is not allowed! Custom Avatar value is ${customAvatar}`);
         cb(new Error(`Custom avatar creation is not allowed! Custom Avatar value is ${customAvatar}`));
      }
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname); // avatars are already coming as ${emotion}.png from frontend
   },
});

const upload = multer ({
   storage: storage,
   fileFilter: (req, file, cb) => {
      const type = file.mimetype === 'image/png';
      if (type) {
         cb(null, true);
      } else {
         cb(new Error("Only .png type is supported"));
      }
   },
});

router.post("/add", (req, res) => {
   const newCharacter = req.body;
   const charactersPath = path.join(__dirname, "../../frontend/src/characters.json");

   if (!newCharacter.name || !newCharacter.description  || !newCharacter.personality) {
      console.log("Character Add Error: Character informations missing!");
      return res.status(400).json({ error: "Character name, description, and personality must not be empty!" });
   } else if (newCharacter.emotions.length === 0) {
      console.log("Character does not have any emotion!");
      return res.status(400).json({ error: "Character does not have any emotion!" });
   }

   fs.readFile(charactersPath, "utf-8", (err, data) => {
      if (err) {
         console.log("Character Add Error: Failed to read file!");
         return res.status(500).json({ error: "Failed to read file" });
      }

      const characters = JSON.parse(data);
      // checking if there is already a character with the same name in the database
      const characterExists = characters.some(character => character.name === newCharacter.name);
      if (characterExists) {
         console.log(`Character Add Error: Character with name '${newCharacter.name}' already exists!`);
         return res.status(400).json({ error: `Character with name '${newCharacter.name}' already exists!` });
      }

      characters.push(newCharacter);
      fs.writeFile(charactersPath, JSON.stringify(characters, null, 3), (err) => {
         if (err) {
            console.log("Character Add Error: Failed to write to file!");
            return res.status(500).json({ error: "Failed to write to file" });
         }
         console.log("Character added successfullly!");
         res.status(200).json({ message: "Character added successfullly!" });
      });
   });
});

router.post("/upload-avatar", upload.fields([{ name: 'avatars', maxCount: 4 }]), (req, res) => {
   //const avatarsPath = path.join(__dirname, "../../frontend/public/avatars");
   try {
      res.status(200).json({ message: "Character avatars uploaded successfully!" });
   } catch (error) {
      console.error("ERROR: Failed to upload character avatars!", error);
      res.status(500).json({ error: "ERROR: Failed to upload character avatars!" });
   }
});

module.exports = router;
