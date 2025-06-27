import { useEffect, useState } from "react";
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 5000);
    const timer2 = setTimeout(() => setAnimationPhase(2), 300);
    const timer3 = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 transition-opacity duration-500 ${
        !isVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/30 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-indigo-200/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-300/20 rounded-lg animate-pulse"></div>
      </div>

      <div className="text-center z-10">
        <div
          className={`transition-all duration-700 delay-500 ${
            animationPhase >= 1
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          {" "}
          <p className="text-xl md:text-6xl text-gray-600 mb-8 font-extrabold tracking-widest">
            SCRIBBLE
          </p>
          <p className="text-xl md:text-4xl text-gray-600 mb-8 font-bold">
            Collaborative Drawing Made Simple
          </p>
        </div>

        <div
          className={`mt-12 transition-all duration-700 delay-1000 ${
            animationPhase >= 2
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-800 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">Loading your canvas...</p>
        </div>
      </div>
    </div>
  );
}
