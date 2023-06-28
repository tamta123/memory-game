import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import MenuModal from "./MenuModal";
import FinishModal from "./FinishModal";
import useTimer from "./useTimer";
import MultiPlayerGameOver from "./MultiPlayerGameOver.jsx";
import {
  faTree,
  faStar,
  faCoffee,
  faHouse,
  faSun,
  faMoon,
  faMountain,
  faCar,
  faRainbow,
  faDragon,
  faBaby,
  faGlasses,
  faHamburger,
  faLocation,
  faTable,
  faIceCream,
  faLaptopFile,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const theme = searchParams.get("theme");
  const playerMode = searchParams.get("playerMode");
  const gridSize = searchParams.get("gridSize");

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [allMatched, setAllMatched] = useState(false); // Declare allMatched state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [players, setPlayers] = useState([]);

  const { minutes, seconds, finished, stopTimer } = useTimer(allMatched);

  const generate = () => {
    const icons = [
      faTree,
      faStar,
      faCoffee,
      faHouse,
      faSun,
      faMoon,
      faMountain,
      faCar,
      faDragon,
      faRainbow,
      faBaby,
      faGlasses,
      faHamburger,
      faLocation,
      faTable,
      faIceCream,
      faLaptopFile,
      faFire,
    ];

    const numbersArray = [];
    for (let i = 1; i <= gridSize; i++) {
      numbersArray.push({ value: i, id: i, isFaceUp: false, matched: false });
    }

    const doubledArray = [...numbersArray, ...numbersArray];

    const iconsArray = doubledArray.map((number, index) => {
      return {
        value: icons[number.value - 1],
        id: index,
        isFaceUp: false,
        matched: false,
      };
    });

    let finalArray;

    if (theme === "numbers") {
      finalArray = doubledArray.map((number, index) => {
        return {
          ...number,
          id: index,
        };
      });
    } else {
      finalArray = iconsArray;
    }

    const shuffledArray = finalArray.sort((a, b) => 0.5 - Math.random());
    setCards(shuffledArray);

    return shuffledArray;
  };

  useEffect(() => {
    const newCards = generate();
  }, []);

  useEffect(() => {
    const initialPlayers = Array.from({ length: playerMode }, (_, index) => ({
      title: `Player ${index + 1}`,
      matched: 0,
      active: index === 0,
    }));
    setPlayers(initialPlayers);
  }, [playerMode]);
  console.log(players);

  const handleMatch = (card) => {
    if (playerMode <= 1) {
      handleSingleMatch(card);
    } else {
      handleMultiPlayerMatch(card);
    }
  };

  const handleSingleMatch = (card) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    if (disableButtons) {
      // Disable clicking on cards while the delay is in progress
      return;
    }
    if (selectedCard === null) {
      // No card is currently selected, so set the clicked card as the selected card
      setSelectedCard(card);
      const updatedCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, isFaceUp: true };
        }
        return c;
      });
      setCards(updatedCards);
    } else {
      // A card is already selected, so compare the values
      const updatedCards = cards.map((c) => {
        if (c.id === selectedCard.id || c.id === card.id) {
          return { ...c, isFaceUp: true };
        }
        return c;
      });
      setCards(updatedCards);

      // Check if the values of the selected cards match
      if (selectedCard.value === card.value) {
        // Values match, mark both cards as matched
        const matchedCards = updatedCards.map((c) => {
          if (c.id === selectedCard.id || c.id === card.id) {
            return { ...c, matched: true };
          }
          return c;
        });
        setCards(matchedCards);
      } else {
        setDisableButtons(true); // Disable clicking on cards

        // Values don't match, flip both cards face down
        setTimeout(() => {
          const flippedCards = updatedCards.map((c) => {
            if (c.id === selectedCard.id || c.id === card.id) {
              return { ...c, isFaceUp: false };
            }
            return c;
          });
          setCards(flippedCards);
          setDisableButtons(false); // Enable clicking on cards after the delay
        }, 1000); // Delay to show the cards for 0.5 second before flipping back
      }
      setSelectedCard(null);
      setMoveCount((count) => count + 1); // Increment the move count
    }
  };

  const handleMultiPlayerMatch = (card) => {
    if (disableButtons) {
      // Disable clicking on cards while the delay is in progress
      return;
    }

    if (selectedCard === null) {
      // No card is currently selected, so set the clicked card as the selected card
      setSelectedCard(card);
      const updatedCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, isFaceUp: true };
        }
        return c;
      });
      setCards(updatedCards);
    } else {
      // A card is already selected, so compare the values
      const updatedCards = cards.map((c) => {
        if (c.id === selectedCard.id || c.id === card.id) {
          return { ...c, isFaceUp: true };
        }
        return c;
      });
      setCards(updatedCards);

      // Check if the values of the selected cards match
      if (selectedCard.value === card.value) {
        // Values match, mark both cards as matched
        const matchedCards = updatedCards.map((c) => {
          if (c.id === selectedCard.id || c.id === card.id) {
            return { ...c, matched: true };
          }
          return c;
        });
        setCards(matchedCards);

        // Update the match count for the active player
        setPlayers((prevPlayers) => {
          return prevPlayers.map((player) => {
            if (player.active) {
              return { ...player, matched: player.matched + 1 };
            }
            return player;
          });
        });
      } else {
        setDisableButtons(true); // Disable clicking on cards

        // Values don't match, flip both cards face down
        setTimeout(() => {
          const flippedCards = updatedCards.map((c) => {
            if (c.id === selectedCard.id || c.id === card.id) {
              return { ...c, isFaceUp: false };
            }
            return c;
          });
          setCards(flippedCards);
          setDisableButtons(false); // Enable clicking on cards after the delay
        }, 1000); // Delay to show the cards for 1 second before flipping back
      }

      setSelectedCard(null);
      setMoveCount((count) => count + 1); // Increment the move count

      // Switch the active participant
      setPlayers((prevPlayers) => {
        console.log(players);

        const activeParticipantIndex = prevPlayers.findIndex(
          (participant) => participant.active
        );
        const nextParticipantIndex =
          (activeParticipantIndex + 1) % prevPlayers.length;
        return prevPlayers.map((participant, index) => {
          if (index === activeParticipantIndex) {
            return { ...participant, active: false };
          }
          if (index === nextParticipantIndex) {
            return { ...participant, active: true };
          }

          return participant;
        });
      });
    }
  };

  useEffect(() => {
    const isAllMatched = cards.every((c) => c.matched);
    console.log(isAllMatched);
    if (isAllMatched) {
      setTimerStarted(false);
    }
    setAllMatched(isAllMatched);
  }, [cards]);

  return (
    <>
      <div className="flex justify-between px-6 pt-6">
        <h1 className="font-bold text-xl leading-7 text-center text-[#152938]">
          memory
        </h1>
        <button
          className=" bg-[#FDA214] rounded-[26px] px-5 py-3 font-bold text-base leading-5 text-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          menu
        </button>
      </div>
      <div
        className={
          +gridSize === 18
            ? "text-white grid gap-5 px-6 pt-[85px] grid-cols-6 "
            : "text-white grid gap-5 px-6 pt-[85px] grid-cols-4"
        }
      >
        {cards.map((card, index) => (
          <div key={index} className="">
            <Card
              card={card}
              theme={theme}
              handleMatch={handleMatch}
              gridSize={gridSize}
            />
          </div>
        ))}
      </div>
      {playerMode <= 1 ? (
        <div className="flex gap-6 px-6 pb-6 pt-[102px]">
          <div className="flex flex-col justify-center items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px]">
            <span className="font-bold text-base leading-normal text-center text-[#7191A5]">
              Time
            </span>
            <span className="font-bold text-2xl leading-7 text-center text-[#304859]">
              {timerStarted ? (
                <div className="">
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </div>
              ) : (
                "00:00"
              )}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px]">
            <span className="font-bold text-base leading-normal text-center text-[#7191A5]">
              Moves
            </span>
            <span className="font-bold text-2xl leading-7 text-center text-[#304859]">
              {moveCount}
            </span>
          </div>
        </div>
      ) : (
        // Render the player information for multiplayer mode
        <div className={`flex gap-6 px-6 pb-6 pt-[102px]  `}>
          {players.map((player, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px] ${
                player.active ? "bg-[#FDA214] text-[#ffffff]" : "bg-[#DFE7EC]"
              }`}
            >
              <span
                className={`font-bold text-base leading-normal text-center  ${
                  player.active ? " text-[#ffffff]" : "text-[#7191A5]"
                }`}
              >
                P {index + 1}
              </span>
              <span
                className={`font-bold text-2xl leading-7 text-center  ${
                  player.active ? " text-[#ffffff]" : "text-[#304859]"
                }`}
              >
                {player.matched}
              </span>
            </div>
          ))}
        </div>
      )}
      {isMenuOpen && (
        <MenuModal
          generate={generate}
          setCards={setCards}
          setSelectedCard={setSelectedCard}
          setDisableButtons={setDisableButtons}
          setMoveCount={setMoveCount}
          setTimerStarted={setTimerStarted}
          setAllMatched={setAllMatched}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
      {allMatched && playerMode == 1 && (
        <FinishModal
          generate={generate}
          setCards={setCards}
          setSelectedCard={setSelectedCard}
          setDisableButtons={setDisableButtons}
          setMoveCount={setMoveCount}
          setTimerStarted={setTimerStarted}
          moveCount={moveCount}
          minutes={minutes}
          seconds={seconds}
          stopTimer={stopTimer}
          setAllMatched={setAllMatched}
        />
      )}
      {allMatched && playerMode > 1 && (
        <MultiPlayerGameOver
          players={players}
          generate={generate}
          setCards={setCards}
          setSelectedCard={setSelectedCard}
          setDisableButtons={setDisableButtons}
          setMoveCount={setMoveCount}
          setTimerStarted={setTimerStarted}
          setAllMatched={setAllMatched}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </>
  );
};

export default Game;

// for shuffle array https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
