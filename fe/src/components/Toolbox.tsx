import clsx from "clsx";
import { SHAPES } from "../utils/utils";

const Toolbox = ({
  setSelected,
  selected,
}: {
  selected: string;
  setSelected: (shape: string) => void;
}) => {
  return (
    <div
      className="absolute inset-0 flex justify-center space-x-10 my-1 py-2 bg-purple-50 h-16 z-50
    w-lg mx-auto shadow-md rounded-lg "
    >
      {SHAPES.map((shape) => (
        <span
          key={shape.id}
          className={clsx(
            "text-center items-center flex transition-all font-bold hover:cursor-pointer text-neutral-700",
            selected === shape.id
              ? " scale-200"
              : "hover:scale-125 text-neutral-900"
          )}
          onClick={() => setSelected(shape.id)}
        >
          {shape.icon}
        </span>
      ))}
    </div>
  );
};

export default Toolbox;
