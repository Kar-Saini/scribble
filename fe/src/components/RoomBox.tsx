import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const RoomBox = () => {
  const [showRoomOptions, setShowRoomOptions] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoomOptions(false);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="fixed top-2 right-4 w-52 bg-neutral-100/90 backdrop-blur-md border border-neutral-300 rounded-xl shadow-lg py-3 px-4 z-50 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-neutral-800">
          {roomId ? `Room : ${roomId}` : "Room Options"}
        </h2>
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

      {!roomId && showRoomOptions && (
        <>
          <button
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition hover:cursor-pointer"
            onClick={() => {
              const roomId = Math.ceil(Math.random() * 10000);
              setTimeout(() => {
                navigate(`/room/${roomId}`);
              }, 3000);
            }}
          >
            Create Room
          </button>
          <hr className="border-neutral-300" />
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter Room ID"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition hover:cursor-pointer">
              Join Room
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomBox;
