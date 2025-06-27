import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import toast from "react-hot-toast";

const RoomBox = ({
  socket,
  userId,
}: {
  socket: WebSocket | null;
  userId: string;
}) => {
  const [showRoomOptions, setShowRoomOptions] = useState(true);
  const [adminname, setAdminName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoomOptions(false);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, [socket]);

  function handleRoomCreation(adminName: string) {
    if (adminName.length < 3) {
      toast.error("Admin name should be of atleast 3 characters");
      return;
    }
    setLoading(true);
    socket?.send(
      JSON.stringify({
        type: "create_room",
        payload: {
          adminName,
          adminId: userId,
        },
      })
    );
  }

  function handleJoinRooom(roomId: string) {
    if (joinRoomId == "") {
      toast.error("Enter Room ID");
      return;
    }
    socket?.send(
      JSON.stringify({
        type: "join_room",
        payload: {
          roomId,
          userId,
          shape: [],
        },
      })
    );
  }
  return (
    <div className="fixed top-2 right-4 w-52 bg-neutral-100/90 backdrop-blur-md border border-neutral-300 rounded-xl shadow-lg py-3 px-4 z-50 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-neutral-800">Room Options</h2>
        {showRoomOptions ? (
          <IoIosArrowUp
            onClick={() => setShowRoomOptions(!showRoomOptions)}
            className="hover:cursor-pointer hover:scale-125 transition-all"
            size={24}
          />
        ) : (
          <IoIosArrowDown
            onClick={() => setShowRoomOptions(!showRoomOptions)}
            className="hover:cursor-pointer hover:scale-125 transition-all"
            size={24}
          />
        )}
      </div>

      {showRoomOptions && (
        <>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Admin Name"
              className="w-full px-3 py-1 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs font-bold text-neutral-600"
              value={adminname}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <button
              className="w-full px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition hover:cursor-pointer text-sm font-bold"
              disabled={loading}
              onClick={() => handleRoomCreation(adminname)}
            >
              {loading ? "loading..." : "Create a room"}
            </button>
          </div>
          <hr className="border-neutral-300" />
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter Room ID"
              className="w-full px-3 py-1 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs font-bold text-neutral-600"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />
            <button
              className="w-full px-4 py-1 text-sm font-bold bg-green-500 text-white rounded-md hover:bg-green-600 transition hover:cursor-pointer"
              onClick={() => handleJoinRooom(joinRoomId)}
            >
              Join Room
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomBox;
