import "./App.css";
import { Route, Routes } from "react-router-dom";
import Acceuil from "./components/Acceuil";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import PersonPage from "./components/PersonPage";
import Error from "./components/Error.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:id" element={<PersonPage />} />
        <Route path="*" element={<Error />} />
        {/* <Route path="/search/" element={<SearchPage />}>
          <Route path=":id" element={<Acceuil />} />
        </Route> */}

        {/* <Route path="/components/SearchPage/:personId" element={<SearchResult />} /> */}
      </Routes>
    </div>
  );
}

export default App;
