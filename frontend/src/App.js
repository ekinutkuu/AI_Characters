import "./App.css";
import CharacterCard from "./components/CharacterCard/CharacterCard";

function App() {
   return (
      <div className="App">
         <div className="characterCards">
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
}

export default App;
