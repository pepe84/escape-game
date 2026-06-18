import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { GameEngineService } from "../services/GameEngineService";
import { QuestionEngineService } from "../services/QuestionEngineService";
import { isEmpty } from "../utils/isEmpty";
import { QuestionRenderer } from "../components/questions/QuestionRenderer";
import type { QuestionAnswer } from "../models/QuestionAnswer";
import { StorageService } from "../services/StorageService";

export function GamePage() {

  const { game, state, setState } = useGame();
  const navigate = useNavigate();

  const [answer, setAnswer] = useState<QuestionAnswer>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!game || !state) navigate("/");
    if (state?.finished) navigate("/summary");
  }, [game, state]);

  if (!game || !state) return null;

  const page = game.pages[state.currentPageIndex];
  const totalPages = game.pages.length;
  const progress = GameEngineService.getProgress(game, state);
    
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

  const updateState = (state: any) => {
    setState(state);
    StorageService.saveState(state);
  };

  const finishGame = () => {
    updateState(GameEngineService.finishGame(state));
    navigate("/summary");
  };

  const nextPage = () => {
    if (GameEngineService.isLastPage(game, state)) return finishGame();
    updateState(GameEngineService.nextPage(state));
  };

  const validateQuestion = () => {

    if (isEmpty(answer)) {
      setError("Resposta obligatòria");
      return;
    }
    const result = QuestionEngineService.evaluate(page.question, answer);

    if (!result.correct) {
      updateState(GameEngineService.applyPenalty(state, 60));
      setError("Incorrecte (+1 minut)");
      return;
    }

    updateState(GameEngineService.registerSuccess(state));
    setError(null);
    setAnswer("");
    nextPage();
  };

  return (
    <>
      
      <h2 className="text-xl font-bold">
        {page.title}
      </h2>
      
      <div className="w-full space-y-1">

        <div className="flex justify-between text-sm text-gray-500">
          <span>{state.currentPageIndex + 1} de {totalPages}</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

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