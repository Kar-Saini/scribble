export type INCOMING_MESSAGE =
  | {
      type: "room_created";
      payload: {
        adminName: string;
        roomId: string;
        size: number;
        adminId: string;
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
      type: "user_connected";
      payload: {
        userId: string;
      };
    };

export type RoomDetails = {
  adminName: string;
  roomId: string;
  adminId: string;
  size: number;
};
