import { useEffect, useRef, useState } from "react";
import { draw, type Shape } from "../utils/draw";

const Canvas = ({ selected }: { selected: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cleanup = draw(canvas, ctx, selected, shapes, setShapes);
    return cleanup;
  }, [shapes, selected]);
  console.log(shapes);
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border"
      />
    </div>
  );
};

export default Canvas;
