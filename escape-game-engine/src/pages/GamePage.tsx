import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export function GamePage() {
  const { game, state } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!game || !state) {
      navigate("/");
    }
  }, [game, state]);

  if (!game || !state) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">

      {/* CONTENT PLACEHOLDER */}
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-2xl font-bold">{game.title}</h1>
        <p className="text-gray-500 mt-2">
          Pàgina actual: {state.currentPageIndex}
        </p>
      </div>

    </div>
  );
}