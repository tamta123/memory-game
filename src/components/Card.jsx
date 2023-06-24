import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ card, theme, handleMatch, gridSize }) => {
  const handleClick = () => {
    handleMatch(card);
    console.log(card);
  };

  return (
    <div>
      {theme === "numbers" ? (
        card.isFaceUp ? (
          <div
            className={`flex justify-center aspect-square rounded-[59px]  text-center font-bold text-2xl leading-10 text-white card ${
              +gridSize === 18 ? "text-xl leading-10" : "text-2xl"
            } 
            ${
              card.matched ? "bg-[#BCCED9]" : "bg-[#FDA214]"
            } flex justify-center items-center`}
            style={{
              transform: "rotateY(180deg)",
              transition: "all 0.2s ease-in 0s",
            }}
          >
            <div
              style={{
                transform: "rotateY(-180deg)",
                transition: "all 0.2s ease-in 0s",
              }}
            >
              {card.value}
            </div>
          </div>
        ) : (
          <div
            className={`flex justify-center text-center font-bold text-2xl leading-10 text-white aspect-square rounded-[59px] bg-[#304859] `}
            style={{
              transition: "all 0.2s ease-in 0.2s",
              transform: "rotateY(0deg)",
            }}
            onClick={handleClick}
          ></div>
        )
      ) : card.isFaceUp ? (
        <div
          className={`flex justify-center font-bold text-2xl leading-10 aspect-square rounded-[59px] text-center card  ${
            card.matched ? "bg-[#BCCED9]" : "bg-[#FDA214]"
          }`}
          style={{
            transform: "rotateY(180deg)",
            transition: "all 0.2s ease-in 0s",
          }}
        >
          <FontAwesomeIcon
            className={` 
           ${
             +gridSize === 8
               ? "scale-[1.5] translate-y-[100%]"
               : "scale-[0.9] translate-y-[40%]"
           }`}
            icon={card.value}
          />
        </div>
      ) : (
        <div
          className={`aspect-square rounded-[59px] bg-[#304859] `}
          onClick={handleClick}
          style={{
            transition: "all 0.2s ease-in 0.2s",
            transform: "rotateY(0deg)",
          }}
        ></div>
      )}
    </div>
  );
};

export default Card;
