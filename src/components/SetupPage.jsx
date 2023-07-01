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
    <div className="h-[100vh] w-full bg-[#152938] flex justify-center flex-col items-center">
      <h1 className="text-center text-white font-bold text-3xl pt-20 mb-11 mx-[127px]  md:pb-[78px] md:text-[40px] md:m-0">
        memory
      </h1>
      <div className="bg-white  flex flex-col justify-center  rounded-[10px] mx-6 p-6  md:px-[57px] lg:w-[50%] lg:px-[80px] lg:py-[50px]">
        <h2 className=" font-bold text-base md:text-[20px] leading-[19px] text-[#7191A5] pb-3 md:pb-4">
          Select Theme
        </h2>
        <div className="flex justify-between md:w-full gap-2">
          <button
            className={`h-10 md:h-[52px] w-[134px] md:w-[257px] rounded-[26px] font-bold text-sm md:text-[26px] md:py-[13px] text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              theme === "numbers" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setTheme("numbers")}
          >
            Numbers
          </button>
          <button
            className={`h-10 md:h-[52px] w-[134px] md:w-[257px] bg-[#304859] rounded-[26px] font-bold text-sm md:text-[26px] md:py-[13px] text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              theme === "icons" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setTheme("icons")}
          >
            Icons
          </button>
        </div>
        <h2 className=" font-bold  md:text-[20px]  text-base leading-[19px] text-[#7191A5] pb-3 pt-6 md:pb-4 md:pt-[32px]">
          Numbers of Players
        </h2>
        <div className="flex justify-between gap-2">
          <button
            className={`h-10 w-[66px] md:h-[52px] md:w-[119px] bg-[#304859] rounded-[26px] font-bold text-sm md:text-[26px] text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              playerMode === "1" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("1")}
          >
            1
          </button>
          <button
            className={`h-10 w-[66px] md:h-[52px] md:w-[119px] bg-[#304859] rounded-[26px] font-bold text-sm md:text-[26px] text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              playerMode === "2" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("2")}
          >
            2
          </button>
          <button
            className={`h-10 w-[66px] md:h-[52px] md:w-[119px] bg-[#304859] rounded-[26px] font-bold text-sm md:text-[26px] text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              playerMode === "3" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("3")}
          >
            3
          </button>
          <button
            className={`h-10 w-[66px] md:h-[52px] md:w-[119px] bg-[#304859] rounded-[26px] font-bold text-sm md:text-[26px] text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              playerMode === "4" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setPlayerMode("4")}
          >
            4
          </button>
        </div>
        <h2 className="md:text-[20px]  font-bold text-base leading-[19px] text-[#7191A5] pb-3 pt-6 md:pb-4 md:pt-[32px]">
          Grid Size
        </h2>
        <div className="flex justify-between  pb-8 gap-2">
          <button
            className={`h-10   md:h-[52px] md:w-[257px] md:text-[26px] md:py-[13px] w-[134px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              gridSize === 8 ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setGridSize(8)}
          >
            4x4
          </button>
          <button
            className={`h-10 md:h-[52px] md:w-[257px] md:text-[26px] md:py-[13px] w-[134px] bg-[#304859] rounded-[26px] font-bold text-sm text-[#FCFCFC] cursor-pointer hover:bg-[#6395B8] ${
              gridSize === 18 ? "bg-[#304859]" : "bg-[#BCCED9]"
            }`}
            onClick={() => setGridSize(18)}
          >
            6x6
          </button>
        </div>
        <button
          className="w-full h-12 bg-[#FDA214] rounded-[26px] md:rounded-[35px] font-bold text-sm md:text-[32px] md:h-[70px] text-[#FCFCFC] items-center cursor-pointer hover:bg-[#FFB84A]"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default SetupPage;
