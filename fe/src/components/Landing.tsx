import { useState } from "react";
import Canvas from "./Canvas";
import Toolbox from "./Toolbox";

const Landing = () => {
  const [selected, setSelected] = useState<string>("triangle");

  return (
    <div className="flex">
      <Toolbox selected={selected} setSelected={setSelected} />
      <Canvas selected={selected} />
    </div>
  );
};

export default Landing;
