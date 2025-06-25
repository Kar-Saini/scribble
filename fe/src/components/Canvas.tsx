import { useEffect, useRef, useState } from "react";
import { draw, type Shape, type ShapeType } from "../utils/draw";

const Canvas = ({
  selected,
  color,
}: {
  selected: ShapeType;
  color: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const container = containerRef.current;
      canvasRef.current.width = container.clientWidth;
      canvasRef.current.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cleanup = draw(canvas, ctx, selected, shapes, setShapes, color);
    return cleanup;
  }, [selected, shapes, color]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <canvas ref={canvasRef} className="border" />
    </div>
  );
};

export default Canvas;
