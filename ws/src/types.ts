export interface Shape {
  type: string;
  color: string;
  width: number;
  height: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  userId?: string;
}
