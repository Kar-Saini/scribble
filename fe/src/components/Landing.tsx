import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Toolbox from "./Toolbox";
import type { ShapeType } from "../utils/draw";
import Paintbox from "./Paintbox";
import type { INCOMING_MESSAGE, RoomDetails } from "../utils/types";
import RoomBox from "./RoomBox";
import RoomDetailsComponent from "./RoomDetailsComponent";
import toast from "react-hot-toast";
import SplashScreen from "./SplashScreen";

const Landing = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [selected, setSelected] = useState<ShapeType>("rectangle");
  const [color, setColor] = useState<string>("black");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!showSplash) {
      const ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () => {
        console.log("socket conneted");
        setSocket(ws);
      };
      ws.onmessage = (event) => {
        try {
          const data: INCOMING_MESSAGE = JSON.parse(event.data);
          console.log("Received:", data);
          switch (data.type) {
            case "user_connected":
              setUserId(data.payload.userId);
              break;
            case "room_created":
              console.log("Room created:", data.payload);
              setRoomDetails(data.payload);
              toast.success("Room created");
              console.log(roomDetails);
              break;
            case "user_joined":
              console.log("User joined:", data.payload);
              setRoomDetails(data.payload);
              toast.success("User joined");
              break;
            default:
              console.warn("Unknown message type:", data);
          }
        } catch (err) {
          console.error("Invalid message received", err);
        }
      };
      return () => {
        ws.close();
        console.log("socket disconneted");
      };
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000);
  }, []);

  console.log(roomDetails);
  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <div className="flex bg-pink-50 ">
      <Toolbox selected={selected} setSelected={setSelected} />
      <Paintbox color={color} setColor={setColor} />
      <Canvas selected={selected} color={color} />
      {roomDetails ? (
        <RoomDetailsComponent
          roomDetails={roomDetails}
          socket={socket}
          userId={userId}
        />
      ) : (
        <RoomBox socket={socket} userId={userId} />
      )}
    </div>
  );
};

export default Landing;
