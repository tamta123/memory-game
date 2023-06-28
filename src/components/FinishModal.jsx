import { useNavigate } from "react-router-dom";
import useTimer from "./useTimer";

const FinishModal = ({
  generate,
  setCards,
  setSelectedCard,
  setDisableButtons,
  setMoveCount,
  setTimerStarted,
  setAllMatched,
  moveCount,
  allMatched,
  stopTimer,
  minutes,
  seconds,
}) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    // Logic for restarting the game
    const newCards = generate(); // Generate a new set of cards
    setCards(newCards);
    setSelectedCard(null);
    setDisableButtons(false);
    setMoveCount(0);
    setTimerStarted(false);
    setAllMatched(false);
    setIsMenuOpen(false); // Close the modal
  };

  const handleNewGame = () => {
    navigate("/");
  };

  stopTimer(); // Call stopTimer to get the minutes and seconds

  return (
    <>
      <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="flex flex-col gap-2 w-[90%] p-6 pt-8 bg-[#F2F2F2] rounded-[10px] justify-center items-center">
          <span className="text-[#152938] text-center text-2xl font-bold">
            You did it!
          </span>
          <span className="text-[#7191A5] text-sm font-bold mb-4">
            Game over! Here’s how you got on…
          </span>
          <div className="w-full flex flex-col gap-2 ">
            <div className="flex justify-between items-center bg-[#DFE7EC] rounded-[5px] w-full h-12 px-4 py-[11px]">
              <span className="text-[#7191A5] text-sm font-bold">
                Time Elapsed
              </span>
              <div className="text-[#304859] text-[20px] font-bold">
                <div className="">
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-[#DFE7EC] rounded-[5px] w-full h-12 px-4 py-[11px] mb-3">
              <span className="text-[#7191A5] text-sm font-bold">
                Moves Taken
              </span>
              <div className="text-[#304859] text-[20px] font-bold">
                {moveCount}
              </div>
            </div>
            <button
              className="w-full h-[48px] bg-[#FDA214] rounded-[26px] font-bold text-xl leading-6 text-center text-white flex items-center justify-center mb-2"
              onClick={handleRestart}
            >
              Restart
            </button>
            <button
              className="w-full h-[48px] bg-[#DFE7EC] rounded-[26px] font-bold text-xl leading-6 text-center text-[#304859] flex items-center justify-center"
              onClick={handleNewGame}
            >
              Setup New Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FinishModal;
