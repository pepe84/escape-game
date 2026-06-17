import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { GameEngineService } from "../services/GameEngineService";
import { useGamePersistence } from "../hooks/useGamePersistence";

export function GamePage() {

  const { game, state } = useGame();
  const { commit } = useGamePersistence();
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!game || !state) navigate("/");
  }, [game, state]);

  if (!game || !state) return null;

  const page = game.pages[state.currentPageIndex];

  const finishGame = () => {
    commit(GameEngineService.finishGame(state));
    navigate("/summary");
  };

  const nextPage = () => {
    if (GameEngineService.isLastPage(game, state)) return finishGame();
    commit(GameEngineService.nextPage(state));
  };

  const validateQuestion = () => {

    const ok =
      answer.trim().toLowerCase() ===
      page.question.answer.trim().toLowerCase();

    if (!ok) {
      commit(GameEngineService.applyPenalty(state, 60));
      setError("Incorrecte (+1 minut)");
      return;
    }

    commit(GameEngineService.registerSuccess(state));
    setError(null);
    nextPage();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <h2 className="text-xl font-bold">
          {page.title}
        </h2>

        <div className="text-gray-700 whitespace-pre-wrap">
          {page.content}
        </div>
        
        {page.type === "question" && (
          <div className="space-y-4">

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Resposta..."
            />

            <button
              onClick={validateQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Resoldre
            </button>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

          </div>
        )}

        {page.type === "info" && (
          <div className="flex justify-end">
            <button
              onClick={nextPage}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Següent
            </button>
          </div>
        )}

      </div>
    </div>
  );
}