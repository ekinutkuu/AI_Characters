import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSelection from "./pages/CharacterSelection";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<CharacterSelection />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
