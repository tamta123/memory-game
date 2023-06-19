import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ card, theme, handleMatch }) => {
  const handleClick = () => {
    handleMatch(card);
  };

  return (
    <div>
      {theme === "numbers" ? (
        <div className={` bg-[#BCCED9] text-center card `}>
          {card.isFaceUp ? (
            <span>{card.value}</span>
          ) : (
            <div className=" bg-[#304859]" onClick={handleClick}>
              ?
            </div>
          )}
        </div>
      ) : (
        <div className={`   bg-[#BCCED9] card `}>
          <div
            className={`bg-[#BCCED9] card ${
              card.isFaceUp ? "face-up" : "face-down"
            }`}
          >
            {card.isFaceUp ? (
              <FontAwesomeIcon icon={card.value} />
            ) : (
              <div className="bg-[#304859]" onClick={handleClick}>
                ?
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  console.log(card);
};

export default Card;
