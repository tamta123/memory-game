import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ card, theme }) => {
  console.log(card);

  return (
    <div>
      {theme === "numbers" ? (
        <div
          className={` bg-[#BCCED9] text-center card ${
            card.isFaceUp ? "face-up" : "face-down"
          }`}
        >
          {card.isFaceUp ? (
            <span>{card.value}</span>
          ) : (
            <div className=" bg-[#304859]"></div>
          )}
        </div>
      ) : (
        <div
          className={`   bg-[#BCCED9] card ${
            card.isFaceUp ? "face-up" : "face-down"
          }`}
        >
          <div
            className={`bg-[#BCCED9] card ${
              card.isFaceUp ? "face-up" : "face-down"
            }`}
          >
            {card.isFaceUp ? (
              <FontAwesomeIcon icon={card.value} />
            ) : (
              <div className="bg-[#304859]"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
