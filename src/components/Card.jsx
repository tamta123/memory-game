import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ card, theme, handleMatch }) => {
  const handleClick = () => {
    handleMatch(card);
    console.log(card);
  };

  return (
    <div>
      {theme === "numbers" ? (
        <div
          className={`aspect-square rounded-[59px] bg-[#FDA214] text-center font-bold text-2xl leading-10  text-white card `}
        >
          {card.isFaceUp ? (
            <span className="translate-y-[120%]">{card.value}</span>
          ) : (
            <div
              className="aspect-square rounded-[59px] bg-[#304859]"
              onClick={handleClick}
            ></div>
          )}
        </div>
      ) : (
        <div
          className={`aspect-square rounded-[59px] bg-[#FDA214] text-center card`}
        >
          {card.isFaceUp ? (
            <FontAwesomeIcon
              className="scale-[1.5] translate-y-[120%]"
              icon={card.value}
            />
          ) : (
            <div
              className=" aspect-square rounded-[59px] bg-[#304859]"
              onClick={handleClick}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;

// ქარდის აითემების ზომა სქეილით უნდა შევცვალო გრიდ საიზის შესაბამისად

// აითემები ქარდის შუაში როგორ მოვაქციო? ნამბერებზე თრანსლეითი რატო არ მუშაობს, სქეილი აიქონებზე

// არც მეჩდ ქარდების ქალარ თრანზიშენი მომწონს, იმიტომ რომ მინდა სანამ ახალს დავაქლიქებ მანამდე იყოს ორინჯ და მერე გახდეს
