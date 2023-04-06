import Lists from "./component/Lists";
import Header from "./component/Header";
import "./styles/main.css";
import Opennote from "./component/Opennote";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/note/:id/" element={<Opennote />} />
      </Routes>
      <Header />
      <Lists />
    </div>
  );
}

export default App;
