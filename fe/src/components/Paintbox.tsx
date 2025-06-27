import { FaPaintRoller } from "react-icons/fa";
import { COLORS } from "../utils/utils";
import clsx from "clsx";
import { useState } from "react";

const Paintbox = ({
  color,
  setColor,
}: {
  color: string;
  setColor: (color: string) => void;
}) => {
  const [showColor, setShowColor] = useState(false);
  return (
    <div className="fixed left-2 top-1/2 -translate-y-1/2 w-14 h-auto bg-neutral-200 z-10 p-2 rounded-lg shadow-xl flex flex-col justify-center items-center">
      <div
        onClick={() => setShowColor(!showColor)}
        className="hover:cursor-pointer"
      >
        <FaPaintRoller
          size={40}
          className={`${showColor && "my-4 hover:cursor-pointer"} `}
        />
      </div>

      {showColor &&
        Object.entries(COLORS).map(([colorName, className]) => (
          <div
            key={colorName}
            onClick={() => setColor(colorName)}
            className={clsx(
              `w-8 h-8 my-2 rounded-full hover:cursor-pointer hover:scale-125 transition-all`,
              className,
              color === colorName && "scale-110 border-5 border-neutral-600"
            )}
          />
        ))}
    </div>
  );
};

export default Paintbox;
