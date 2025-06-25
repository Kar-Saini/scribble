export type Shape =
  | {
      type: "triangle";
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      type: "square";
      startX: number;
      startY: number;
      width: number;
    }
  | {
      type: "rectangle";
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export function draw(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  selected: string,
  shapes: Shape[],
  setShapes: (shapes: Shape[]) => void
) {
  let drawing = false;
  let startX = 0;
  let startY = 0;
  let currentShape: Shape | null = null;

  function handleMouseDown(e: MouseEvent) {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!drawing) return;
    const endX = e.offsetX;
    const endY = e.offsetY;
    const width = endX - startX;
    const height = endY - startY;

    switch (selected) {
      case "rectangle":
        currentShape = { type: "rectangle", startX, startY, width, height };
        break;
      case "square":
        currentShape = {
          type: "square",
          startX,
          startY,
          width: Math.min(Math.abs(width), Math.abs(height)),
        };
        break;
      case "line":
        currentShape = { type: "line", startX, startY, endX, endY };
        break;
      case "triangle":
        currentShape = { type: "triangle", startX, startY, width, height };
        break;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearCanvas(canvas, ctx, shapes);
    if (currentShape) drawShape(ctx, currentShape, "red");
  }

  function handleMouseUp() {
    drawing = false;
    if (currentShape) {
      const newShapes = [...shapes, currentShape];
      setShapes(newShapes);
      clearCanvas(canvas, ctx, newShapes);
      currentShape = null;
    }
  }

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}

function clearCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  shapes: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const shape of shapes) {
    drawShape(ctx, shape, "black");
  }
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape, color: string) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  switch (shape.type) {
    case "rectangle":
      ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
      break;
    case "square":
      ctx.fillRect(shape.startX, shape.startY, shape.width, shape.width);
      break;
    case "line":
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
      break;
    case "triangle":
      ctx.moveTo(shape.startX + shape.width / 2, shape.startY);
      ctx.lineTo(shape.startX, shape.startY + shape.height);
      ctx.lineTo(shape.startX + shape.width, shape.startY + shape.height);
      ctx.closePath();
      ctx.fill();
      break;
  }
}
