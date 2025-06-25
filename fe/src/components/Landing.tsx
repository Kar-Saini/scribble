import { useState } from "react";
import Canvas from "./Canvas";
import Toolbox from "./Toolbox";
import type { ShapeType } from "../utils/draw";
import Paintbox from "./Paintbox";

const Landing = () => {
  const [selected, setSelected] = useState<ShapeType>("rectangle");
  const [color, setColor] = useState<string>("black");

  return (
    <div className="flex bg-pink-50 ">
      <Toolbox selected={selected} setSelected={setSelected} />
      <Paintbox color={color} setColor={setColor} />
      <Canvas selected={selected} color={color} />
    </div>
  );
};

export default Landing;
