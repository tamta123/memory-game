import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupPage = () => {
  const [theme, setTheme] = useState("numbers");
  const [playerMode, setPlayerMode] = useState("1");
  const [gridSize, setGridSize] = useState(8);
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (theme && playerMode && gridSize) {
      navigate(
        `/game?theme=${theme}&playerMode=${playerMode}&gridSize=${gridSize}`
      );
    } else {
      alert("please select all game options!");
    }
  };

  return (
    <div className="h-[100vh] w-full bg-[#152938]">
      <h1 className="text-center text-white font-bold text-3xl pt-20 mb-11 mx-[127px]">
        memory
      </h1>
      <div className="bg-white rounded-[10px] mx-6 p-6">
        <h2 className=" font-bold text-base leading-[19px] text-[#7191A5] pb-3">
          Select Theme
        </h2>
        <div className="flex gap-3">
          <button
            className={`h-10 w-[134px]  rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              theme === "numbers" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setTheme("numbers")}
          >
            Numbers
          </button>
          <button
            className={`h-10 w-[134px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              theme === "icons" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setTheme("icons")}
          >
            Icons
          </button>
        </div>
        <h2 className=" font-bold text-base leading-[19px] text-[#7191A5] pb-3 pt-6">
          Numbers of Players
        </h2>
        <div className="flex gap-3">
          <button
            className={`h-10 w-[60px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              playerMode === "1" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("1")}
          >
            1
          </button>
          <button
            className={`h-10 w-[60px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              playerMode === "2" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("2")}
          >
            2
          </button>
          <button
            className={`h-10 w-[60px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              playerMode === "3" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("3")}
          >
            3
          </button>
          <button
            className={`h-10 w-[60px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              playerMode === "4" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("4")}
          >
            4
          </button>
        </div>
        <h2 className=" font-bold text-base leading-[19px] text-[#7191A5] pb-3 pt-6">
          Grid Size
        </h2>
        <div className="flex gap-3 pb-8">
          <button
            className={`h-10 w-[134px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC]  ${
              gridSize === 8 ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setGridSize(8)}
          >
            4x4
          </button>
          <button
            className={`h-10 w-[134px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] ${
              gridSize === 18 ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setGridSize(18)}
          >
            6x6
          </button>
        </div>
        <button
          className="w-full h-12 bg-[#FDA214] rounded-[26px] font-bold text-sm text-[#FCFCFC] items-center"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default SetupPage;
