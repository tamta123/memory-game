import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import MenuModal from "./MenuModal";
import FinishModal from "./FinishModal";
import useTimer from "./useTimer";
import MultiPlayerGameOver from "./MultiPlayerGameOver.jsx";
import RestartNewGame from "./RestartNewGame";

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
  const location = useLocation(); // location object represents the current url location in the browser, it is obtained from useLocation hook
  const searchParams = new URLSearchParams(location.search); // searchParam has the location search property example "http://localhost:5173/game?theme=icons&playerMode=3&gridSize=8"
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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const { minutes, seconds, stopTimer, restartTimer, resumeTimer } =
    useTimer(allMatched);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // The effect is set up without any dependencies array, so it will only run once after the initial render. However, the effect will continue to work because the handleResize function is defined within the component's scope and has access to the isSmallScreen state variable.

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
    ]; // icons array from max 18 icons

    const numbersArray = [];
    for (let i = 1; i <= gridSize; i++) {
      numbersArray.push({ value: i, id: i, isFaceUp: false, matched: false });
    }
    //numbersArray consists of 8 or 18 numbers, because 4x4=16/2=8 and 6x6=36/2=18

    const doubledArray = [...numbersArray, ...numbersArray]; //to find match

    const iconsArray = doubledArray.map((number, index) => {
      return {
        value: icons[number.value - 1],
        id: index,
        isFaceUp: false,
        matched: false,
      };
    }); // it generates doubled icons array from doubled numbers array (18 or 36), ([number.value - 1], number's value begins from 1, thats why we subtract 1 to access the icon with 0 index)

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

    //we create finalArray variable, it theme is number it returns number.... idea is not to shuffle numbers and icons arrays separately

    const shuffledArray = finalArray.sort((a, b) => 0.5 - Math.random());
    setCards(shuffledArray);

    return shuffledArray;
  };

  useEffect(() => {
    const newCards = generate();
  }, []); // useEffect function generates new set of cards when the components initially rendered (empty array stands for this),

  useEffect(() => {
    const initialPlayers = Array.from({ length: playerMode }, (_, index) => ({
      title: `Player ${index + 1}`,
      matched: 0,
      active: index === 0,
    }));
    setPlayers(initialPlayers); // function to update the state with the initial player data.
  }, [playerMode]); //this ensures that the players are re-initialized whenever the number of players changes
  //this hook is in response of providing initial player with respect to the player mode (1/2/3/4), this is for the multiple players game
  //array of initial players is created by array.from method.the length of the array depends on the number of players(playerMode), first player is active initially

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
    } // timer should start from the first click
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
        }, 1000); // Delay to show the cards for 1 second before flipping back
      }
      setSelectedCard(null);
      setMoveCount((count) => count + 1); // Increment the move count
    }
  };
  // generate function is for creating numbers and icons array and that has object inside with following keys: value, id, faceup, match

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
      if (selectedCard.value !== card.value) {
        setPlayers((prevPlayers) => {
          const activeParticipantIndex = prevPlayers.findIndex(
            (participant) => participant.active
          );
          const nextParticipantIndex =
            (activeParticipantIndex + 1) % prevPlayers.length; //The modulus operator % is used to wrap the resulting index within the valid range of indices (from 0 to prevPlayers.length - 1).
          //If the resulting index exceeds the maximum index in the list, it wraps around to the first participant, creating a circular behavior.
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
    }
  };

  useEffect(() => {
    const isAllMatched = cards.every((c) => c.matched);
    if (isAllMatched) {
      setTimerStarted(false);
    }
    setAllMatched(isAllMatched);
  }, [cards]);

  return (
    <>
      <div className="flex justify-between px-6 pt-6 md:px-10 md:pt-9 lg:px-[165px] lg:pt-[68px]">
        <h1 className="font-bold text-xl  md:text-[40px] leading-7 text-center text-[#152938]">
          memory
        </h1>
        <button
          className=" md:hidden bg-[#FDA214] rounded-[26px] px-5 py-3 font-bold text-base leading-5 text-center text-white"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            stopTimer();
          }}
        >
          menu
        </button>
        <div className="hidden md:flex md:gap-[16px] md:w-[40%] ">
          <RestartNewGame
            restartTimer={restartTimer}
            setCards={setCards}
            setSelectedCard={setSelectedCard}
            setDisableButtons={setDisableButtons}
            setMoveCount={setMoveCount}
            setTimerStarted={setTimerStarted}
            setAllMatched={setAllMatched}
            setIsMenuOpen={setIsMenuOpen}
            generate={generate}
            setPlayers={setPlayers}
          />
        </div>
      </div>
      <div
        className={`md:px-[118px] md:pt-[158px] lg:px-[454px] lg:pt-[106px] lg:pb-[122px] ${
          +gridSize === 18
            ? "text-white grid gap-5 px-6 pt-[85px] grid-cols-6 "
            : "text-white grid gap-5 px-6 pt-[85px] grid-cols-4"
        }`}
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
        <div className="flex gap-6 px-6 pb-6 pt-[102px] md:px-[118px] lg:p-0 lg:px-[450px] ">
          <div className="flex flex-col md:flex-row md:justify-between md:px-[21px] justify-center items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px]">
            <span className="font-bold text-base  leading-normal text-center text-[#7191A5]">
              Time
            </span>
            <span className="font-bold text-2xl leading-7 text-center md:text-[32px] text-[#304859]">
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
          <div className="flex flex-col  md:flex-row md:justify-between md:px-[21px] justify-center items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px] ">
            <span className="font-bold text-base leading-normal text-center text-[#7191A5]">
              Moves
            </span>
            <span className="font-bold text-2xl leading-7 text-center md:text-[32px] text-[#304859]">
              {moveCount}
            </span>
          </div>
        </div>
      ) : (
        // Render the player information for multiplayer mode
        <div
          className={`flex gap-6 px-6 pb-6 pt-[102px] md:px-[118px] lg:pt-0 `}
        >
          {players.map((player, index) => (
            <div
              key={index}
              className={`flex flex-col md:justify-start justify-center md:items-start items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px] md:px-4 md:pt-3 lg:flex-row lg:justify-between lg:items-center ${
                player.active ? "bg-[#FDA214] text-[#ffffff]" : "bg-[#DFE7EC]"
              }`}
            >
              <span
                className={`font-bold text-base leading-normal text-center lg:text-[18px] ${
                  player.active ? " text-[#ffffff]" : "text-[#7191A5]"
                }`}
              >
                P {index + 1}
              </span>
              <span
                className={`font-bold text-2xl leading-7 text-center lg:text-[32px] ${
                  player.active ? " text-[#ffffff]" : "text-[#304859]"
                }`}
              >
                {player.matched}
              </span>
            </div>
          ))}
        </div>
      )}
      {isMenuOpen && isSmallScreen && (
        <MenuModal
          generate={generate}
          setCards={setCards}
          setSelectedCard={setSelectedCard}
          setDisableButtons={setDisableButtons}
          setMoveCount={setMoveCount}
          setTimerStarted={setTimerStarted}
          setAllMatched={setAllMatched}
          setIsMenuOpen={setIsMenuOpen}
          stopTimer={stopTimer}
          restartTimer={restartTimer}
          resumeTimer={resumeTimer}
          setPlayers={setPlayers}
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
          setIsMenuOpen={setIsMenuOpen}
          restartTimer={restartTimer}
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
          setPlayers={setPlayers}
        />
      )}
    </>
  );
};

export default Game;

// for shuffle array https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
