import { RiAdminFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { BiHash } from "react-icons/bi";
import type { RoomDetails } from "../utils/types";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaExpandAlt } from "react-icons/fa";

export default function RoomDetailsComponent({
  roomDetails,
  socket,
  userId,
}: {
  roomDetails: RoomDetails;
  socket: WebSocket | null;
  userId: string;
}) {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <div className="fixed top-2 right-4 w-64 bg-neutral-100/90 backdrop-blur-md border border-neutral-300 rounded-xl shadow-lg py-4 px-5 z-50 space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-800">
            Room Details
          </h2>
          {showDetails ? (
            <IoClose
              size={24}
              className="hover:cursor-pointer hover:scale-125 transition-all"
              onClick={() => setShowDetails(false)}
            />
          ) : (
            <FaExpandAlt
              className="hover:cursor-pointer hover:scale-125 transition-all"
              onClick={() => setShowDetails(true)}
            />
          )}
        </div>
        {showDetails && (
          <>
            <div className="flex flex-col gap-2 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <RiAdminFill />
                  <p className="font-medium">Admin</p>
                </span>
                <p>{roomDetails.adminName}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BiHash />
                  <p className="font-medium">Room ID</p>
                </span>
                <p>{roomDetails.roomId}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaPeopleGroup />
                  <p className="font-medium">Size</p>
                </span>
                <p>{roomDetails.size}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BsPersonCircle />
                <p className="font-medium">You</p>
              </span>
              <p>{userId}</p>
            </div>

            <button
              className="w-full px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition hover:cursor-pointer"
              onClick={() => {
                if (userId === roomDetails.adminId) {
                  socket?.send(
                    JSON.stringify({
                      type: "delete_room",
                      payload: {
                        roomId: roomDetails.roomId,
                        adminId: roomDetails.adminId,
                      },
                    })
                  );
                } else {
                  socket?.send(
                    JSON.stringify({
                      type: "leave_room",
                      payload: {
                        roomId: roomDetails.roomId,
                        userId,
                      },
                    })
                  );
                }
              }}
            >
              {userId === roomDetails.adminId ? "Delete Room" : "Leave Room"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
