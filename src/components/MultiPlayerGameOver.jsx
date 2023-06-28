import { useNavigate } from "react-router-dom";

const MultiPlayerGameOver = ({
  players,
  generate,
  setCards,
  setSelectedCard,
  setDisableButtons,
  setMoveCount,
  setTimerStarted,
  setAllMatched,
  setIsMenuOpen,
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

  // Sort the players based on their matched count
  const sortedPlayers = players.sort((a, b) => b.matched - a.matched);
  console.log(players);

  return (
    <>
      <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="flex flex-col gap-[16px] w-[90%] h-[auto] bg-[#F2F2F2] rounded-[10px] p-[24px] m-auto">
          <span className="text-[#152938] text-center text-2xl font-bold">
            Player {sortedPlayers[0].title} Wins!
          </span>
          <span className="text-[#7191A5] text-[14px] font-bold text-center">
            Game over! Here are the results…
          </span>
          <div>
            {sortedPlayers.map((player, index) => (
              <div
                className="w-full h-12 bg-[#DFE7EC] flex justify-between items-center px-4 rounded-[5px] mb-2"
                key={index}
              >
                <span className="text-[#7191A5] text-[14px] font-bold">
                  {player.title}
                </span>
                <span className="text-[#304859] text-right text-lg font-bold">
                  {player.matched} Pairs
                </span>
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </>
  );
};
export default MultiPlayerGameOver;
