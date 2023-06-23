import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ card, theme, handleMatch, gridSize }) => {
  const handleClick = () => {
    handleMatch(card);
    console.log(card);
  };

  return (
    <div>
      {theme === "numbers" ? (
        <div
          className={`flex justify-center aspect-square rounded-[59px] bg-[#FDA214] text-center font-bold text-2xl leading-10  text-white card `}
          onClick={handleClick}
        >
          {card.isFaceUp ? (
            <span
              className={`${
                +gridSize === 18 ? "text-xl leading-10" : "text-2xl"
              } flex justify-center items-center`}
            >
              {card.value}
            </span>
          ) : (
            <div className={`aspect-square rounded-[59px] bg-[#304859] `}></div>
          )}
        </div>
      ) : (
        <div
          className={`aspect-square rounded-[59px] bg-[#FDA214] text-center card `}
          onClick={handleClick}
        >
          {card.isFaceUp ? (
            <FontAwesomeIcon
              className={`${
                +gridSize === 18
                  ? "scale-[2] translate-y-[120%]"
                  : "translate-y-[50%]"
              }`}
              icon={card.value}
            />
          ) : (
            <div className={`aspect-square rounded-[59px] bg-[#304859] `}></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
