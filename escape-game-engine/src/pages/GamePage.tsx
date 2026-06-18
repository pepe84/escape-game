import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { useGamePersistence } from "../hooks/useGamePersistence";
import { GameEngineService } from "../services/GameEngineService";
import { QuestionEngineService } from "../services/QuestionEngineService";
import { isEmpty } from "../utils/isEmpty";
import { QuestionRenderer } from "../components/questions/QuestionRenderer";
import type { QuestionAnswer } from "../models/QuestionAnswer";

export function GamePage() {

  const { game, state } = useGame();
  const { commit } = useGamePersistence();
  const navigate = useNavigate();

  const [answer, setAnswer] = useState<QuestionAnswer>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!game || !state) navigate("/");
  }, [game, state]);

  if (!game || !state) return null;

  const page = game.pages[state.currentPageIndex];

  useEffect(() => {

    if (!page?.question) {
      setAnswer("");
      return;
    }

    setAnswer(
      QuestionEngineService.getInitialAnswer(
        page.question
      )
    );

  }, [page]);

  const finishGame = () => {
    commit(GameEngineService.finishGame(state));
    navigate("/summary");
  };

  const nextPage = () => {
    if (GameEngineService.isLastPage(game, state)) return finishGame();
    commit(GameEngineService.nextPage(state));
  };

  const validateQuestion = () => {

    if (isEmpty(answer)) {
      setError("Resposta obligatòria");
      return;
    }
    const result = QuestionEngineService.evaluate(page.question, answer);

    if (!result.correct) {
      commit(GameEngineService.applyPenalty(state, 60));
      setError("Incorrecte (+1 minut)");
      return;
    }

    commit(GameEngineService.registerSuccess(state));
    setError(null);
    setAnswer("");
    nextPage();
  };

  return (
    <>

      <h2 className="text-xl font-bold">
        {page.title}
      </h2>

      <div className="text-gray-700 whitespace-pre-wrap">
        {page.content}
      </div>

      {page.question && (
        <div className="space-y-4">

          <QuestionRenderer
            question={page.question}
            answer={answer}
            onChange={setAnswer}
          />
          
          {page.question?.formatHelp && (
            <div className="text-gray-500 text-sm">
              {page.question?.formatHelp}
            </div>
          )}

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

      {!page.question && (
        <div className="flex justify-end">
          <button
            onClick={nextPage}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            Següent
          </button>
        </div>
      )}

    </>
  );
}