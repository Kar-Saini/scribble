import { WebSocket as ServerWebSocket } from "ws";

export interface Shape {
  type: "rectangle" | "square" | "triangle" | "line" | "circle";
  color: string;
  startX: number;
  startY: number;
  endX?: number;
  width?: number;
  height?: number;
  userId?: string;
}

export type INCOMMING_MESSAGE =
  | {
      type: "create_room";
      payload: { adminName: string; adminId: string };
    }
  | {
      type: "join_room";
      payload: { userId: string; roomId: string; shapes: Shape[] };
    }
  | {
      type: "leave_room";
      payload: { userId: string; roomId: string };
    }
  | {
      type: "delete_room";
      payload: { adminId: string; roomId: string };
    };

export type OUTGOING_MESSAGE =
  | {
      type: "room_created";
      payload: {
        roomId: string;
        adminId: string;
        adminName: string;
        size: number;
      };
    }
  | {
      type: "user_joined";
      payload: {
        roomId: string;
        adminId: string;
        adminName: string;
        size: number;
      };
    }
  | {
      type: "broadcast_shape";
      payload: Shape;
    }
  | {
      type: "room_deleted";
      payload: { message: string };
    }
  | {
      type: "room_left";
      payload: { message: string };
    }
  | {
      type: "error";
      payload: { message: string };
    };
