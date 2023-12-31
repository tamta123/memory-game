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
  setPlayers,
}) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    console.log("press restart");
    // Logic for restarting the game
    const newCards = generate(); // Generate a new set of cards
    setCards(newCards);
    setSelectedCard(null);
    setDisableButtons(false);
    setMoveCount(0);
    setTimerStarted(false);
    setAllMatched(false);
    setIsMenuOpen(false); // Close the modal
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
  const temporary = () => {
    console.log("clicked");
  };

  console.log("tamta");

  const handleNewGame = () => {
    navigate("/");
  };

  // Sort the players based on their matched count
  const sortedPlayers = players.sort((a, b) => b.matched - a.matched);
  console.log(players);

  const highestMatched = sortedPlayers[0].matched;
  const winners = sortedPlayers.filter(
    (player) => player.matched === highestMatched
  );

  let winnerMessage = "";
  if (winners.length === 1) {
    winnerMessage = `${winners[0].title} Wins!`;
  } else {
    winnerMessage = "It's a tie!";
  }

  return (
    <>
      <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="flex flex-col gap-[16px] w-[90%] md:w-[85%] h-[auto] bg-[#F2F2F2] rounded-[10px] p-[24px] md:px-[56px] m-auto lg:w-[40%]">
          <span className="text-[#152938] text-center text-2xl font-bold">
            {winnerMessage}
          </span>
          <span className="text-[#7191A5] text-[14px] font-bold text-center">
            Game over! Here are the results…
          </span>
          <div>
            {sortedPlayers.map((player, index) => (
              <div
                className={`w-full h-12 ${
                  winners.includes(player)
                    ? "bg-[#152938] text-[#FCFCFC]"
                    : "bg-[#DFE7EC]"
                } flex justify-between items-center px-4 rounded-[5px] mb-2 md:mb-4`}
                key={index}
              >
                <span
                  className={` ${
                    winners.includes(player)
                      ? "bg-[#152938] text-[#FCFCFC]"
                      : "bg-[#DFE7EC] text-[#7191A5]"
                  } text-[14px] font-bold`}
                >
                  {player.title}
                  {winners.includes(player) && " (winner!)"}
                </span>
                <span
                  className={`${
                    winners.includes(player)
                      ? "bg-[#152938] text-[#FCFCFC]"
                      : "bg-[#DFE7EC] text-[#7191A5]"
                  } text-right text-lg font-bold`}
                >
                  {player.matched} Pairs
                </span>
              </div>
            ))}
          </div>
          <div className="md:flex md:gap-4">
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
      </div>
    </>
  );
};
export default MultiPlayerGameOver;
