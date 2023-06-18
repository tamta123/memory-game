import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
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

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const theme = searchParams.get("theme");
  const playerMode = searchParams.get("playerMode");
  const gridSize = searchParams.get("gridSize");

  const [cards, setCards] = useState([]);

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
      numbersArray.push({ value: i, isFaceUp: true, matched: false });
    }

    const doubledArray = [...numbersArray, ...numbersArray];

    const iconsArray = doubledArray.map((number, index) => {
      return {
        value: icons[number.value - 1],
        id: index,
        isFaceUp: true,
        matched: false,
      };
    });

    let finalArray;

    if (theme === "numbers") {
      finalArray = doubledArray;
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

  return (
    <>
      <div
        className={
          +gridSize === 18
            ? "text-white grid gap-5 px-6 mt-[85px] grid-cols-6 "
            : "text-white grid gap-5 px-6 mt-[85px] grid-cols-4"
        }
      >
        {cards.map((card, index) => (
          <div key={index}>
            <Card
              card={card}
              //   id={card.id}
              //   value={card.value}
              //   isFaceUp={card.isFaceUp}
              //   matched={card.matched}
              theme={theme}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
