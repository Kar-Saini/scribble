import clsx from "clsx";
import { SHAPES } from "../utils/utils";
import type { ShapeType } from "../utils/draw";

const Toolbox = ({
  setSelected,
  selected,
}: {
  selected: string;
  setSelected: (shape: ShapeType) => void;
}) => {
  return (
    <>
      <div className="fixed top-2 left-1/2 -translate-x-1/2 flex justify-center space-x-8 bg-purple-50 h-16 z-50 px-6 py-2 shadow-md rounded-lg">
        {SHAPES.map((shape) => (
          <span
            key={shape.id}
            className={clsx(
              "flex items-center justify-center text-2xl cursor-pointer transition-all",
              selected === shape.id
                ? "scale-150 text-purple-800"
                : "hover:scale-125 text-neutral-600"
            )}
            onClick={() => setSelected(shape.id as ShapeType)}
          >
            {shape.icon}
          </span>
        ))}
      </div>
    </>
  );
};

export default Toolbox;
