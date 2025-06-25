import {
  LuRectangleHorizontal,
  LuTriangle,
  LuCircle,
  LuSquare,
  LuMoveUpRight,
} from "react-icons/lu";

export const SHAPES = [
  { id: "rectangle", icon: <LuRectangleHorizontal size={30} /> },
  { id: "square", icon: <LuSquare size={25} /> },
  { id: "triangle", icon: <LuTriangle size={25} /> },
  { id: "circle", icon: <LuCircle size={25} /> },
  { id: "line", icon: <LuMoveUpRight size={25} /> },
];

export const COLORS = {
  black: "bg-black",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};
