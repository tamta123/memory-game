import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import MenuModal from "./MenuModal";
// import Timer from "./Timer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Timer from "./Timer";

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

  console.log(cards);

  const handleMatch = (card) => {
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
        }, 1500); // Delay to show the cards for 1 second before flipping back
      }

      setSelectedCard(null);
      setMoveCount((count) => count + 1); // Increment the move count
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
            <Card card={card} theme={theme} handleMatch={handleMatch} />
          </div>
        ))}
      </div>
      <div className="flex gap-6 px-6 pb-6 pt-[102px]">
        <div className="flex flex-col justify-center items-center h-[70px] w-[46%] bg-[#DFE7EC] rounded-[5px]">
          <span className="font-bold text-base leading-normal text-center text-[#7191A5]">
            Time
          </span>
          <span className="font-bold text-2xl leading-7 text-center text-[#304859]">
            {timerStarted && <Timer />}
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
      {isMenuOpen && (
        <MenuModal
          generate={generate}
          setCards={setCards}
          setSelectedCard={setSelectedCard}
          setDisableButtons={setDisableButtons}
          setMoveCount={setMoveCount}
          setTimerStarted={setTimerStarted}
          setAllMatched={setAllMatched}
        />
      )}
    </>
  );
};

export default Game;

// ტაიმერიც უნდა ჩავამატო
// ბოლო მოდალის გამოტანაც უნდა გავაკეთო
