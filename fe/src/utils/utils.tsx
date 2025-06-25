import {
  LuRectangleHorizontal,
  LuTriangle,
  LuCircle,
  LuSquare,
  LuMoveUpRight,
  LuPen,
} from "react-icons/lu";

export const SHAPES = [
  { id: "triangle", icon: <LuTriangle size={25} /> },
  { id: "square", icon: <LuSquare size={25} /> },
  { id: "rectangle", icon: <LuRectangleHorizontal size={30} /> },
  { id: "circle", icon: <LuCircle size={25} /> },
  { id: "line", icon: <LuMoveUpRight size={25} /> },
  { id: "pen", icon: <LuPen size={25} /> },
];
