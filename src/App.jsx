import { Routes, Route } from "react-router-dom";
import SetupPage from "./components/SetupPage";
import Game from "./components/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
