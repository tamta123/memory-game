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
  const [selectedCard, setSelectedCard] = useState(null);

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
        // Values don't match, flip both cards face down
        setTimeout(() => {
          const flippedCards = updatedCards.map((c) => {
            if (c.id === selectedCard.id || c.id === card.id) {
              return { ...c, isFaceUp: false };
            }
            return c;
          });
          setCards(flippedCards);
        }, 2000); // Delay to show the cards for 1 second before flipping back
      }

      setSelectedCard(null);
    }
  };

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
          <div key={index} className="">
            <Card card={card} theme={theme} handleMatch={handleMatch} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;

// ამის ბექგრაუნდი როგორ გავათეთრო?

// ისფეისაფს მგონი დაყოვნება არ სჭირდება და როგორც არის სწორია
// აქ მინდა რომ ქლიქები დავთვალო როგორც მუვები და რითერნში ჩავამატო დივად
// ტაიმერიც უნდა ჩავამატო
// ბოლო მოდალის გამოტანაც უნდა გავაკეთო
// კიდე რა დამრჩა სოლო ფლეიერზე?

// ორი შემტრიალებული მინდა ერთდროულად რომ შეინახოს
//

// გავაკეთო დისეიბლდბათონს სთეითო, პირველ ელსში გავხადო თუ და სეთთაიმაუთში ფალს
