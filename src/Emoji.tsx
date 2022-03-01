import { PropsEmoji } from "./type";
import "../src/style.css";

export const Emoji = ({ symbol, title, keywords }: PropsEmoji) => {
  return (
    <div className="cards">
      <p className="cards__symbol">{symbol}</p>
      <p className="cards__title">{title}</p>
      <p className="cards__keywords">{keywords}</p>
    </div>
  );
};
