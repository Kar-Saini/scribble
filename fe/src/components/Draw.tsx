import Toolbox from "./Toolbox";
import Paintbox from "./Paintbox";
import Canvas from "./Canvas";
import { useState } from "react";
import type { ShapeType } from "../utils/draw";

const Draw = () => {
  const [selected, setSelected] = useState<ShapeType>("rectangle");

  const [color, setColor] = useState<string>("black");

  return (
    <>
      <Toolbox selected={selected} setSelected={setSelected} />
      <Paintbox color={color} setColor={setColor} />
      <Canvas selected={selected} color={color} />
    </>
  );
};

export default Draw;
