import { useNavigate } from "react-router-dom";

const MenuModal = ({
  generate,
  setCards,
  setSelectedCard,
  setDisableButtons,
  setMoveCount,
  setTimerStarted,
  setAllMatched,
  setIsMenuOpen,
  restartTimer,
  resumeTimer,
  setPlayers,
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
    restartTimer();
    // Update the players state to set the first player as active
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player, index) => {
        return {
          ...player,
          active: index === 0, // Set the first player as active (index === 0)
          matched: 0, // Reset the matched count for all players
        };
      });
      return updatedPlayers;
    });
  };

  const handleNewGame = () => {
    navigate("/");
  };

  const handleResumeGame = () => {
    setIsMenuOpen(false);
    resumeTimer();
  };

  return (
    <>
      {
        <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="flex flex-col gap-[16px] w-[90%]  h-auto bg-[#F2F2F2] rounded-[10px] p-[24px] m-auto">
            <button
              className="w-full h-[48px] bg-[#FDA214] rounded-[26px] font-bold text-xl leading-6 text-center text-white flex items-center justify-center"
              onClick={handleRestart}
            >
              Restart
            </button>
            <button
              className="w-full h-[48px] bg-[#DFE7EC] rounded-[26px] font-bold text-xl leading-6 text-center text-[#304859] flex items-center justify-center"
              onClick={handleNewGame}
            >
              New Game
            </button>
            <button
              className="w-full h-[48px] bg-[#DFE7EC] rounded-[26px] font-bold text-xl leading-6 text-center text-[#304859] flex items-center justify-center"
              onClick={handleResumeGame}
            >
              Resume Game
            </button>
          </div>
        </div>
      }
    </>
  );
};
export default MenuModal;
