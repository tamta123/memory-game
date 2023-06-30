import { useNavigate } from "react-router-dom";

const RestartNewGame = ({
  generate,
  setCards,
  setSelectedCard,
  setDisableButtons,
  setMoveCount,
  setTimerStarted,
  setAllMatched,
  setIsMenuOpen,
  restartTimer,
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

  return (
    <div className="md:flex md:gap-[16px] ">
      <button
        className=" bg-[#FDA214] rounded-[26px]  w-auto px-5  py-3 font-bold text-[20px] leading-5 text-center text-white"
        onClick={handleRestart}
      >
        Restart
      </button>
      <button
        className=" bg-[#DFE7EC] rounded-[26px] w-auto px-5  py-3 font-bold text-[20px] leading-5 text-center text-[#304859]"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
};
export default RestartNewGame;
