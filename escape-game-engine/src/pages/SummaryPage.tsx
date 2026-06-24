import { useGame } from "../context/GameContext";
import type { GameEvent } from "../models/GameEvent";
import { GameEventType } from "../models/GameEventType";
import { SummaryService } from "../services/SummaryService";

export function SummaryPage() {
  const { game, state } = useGame();

  if (!game || !state) {
    return (
      <div className="p-8 text-center text-gray-500">
        Carregant resum...
      </div>
    );
  }

  const summary = SummaryService.build(game, state);

  const describeEvent = (event: GameEvent) => {

    switch (event.type) {

      case GameEventType.GAME_STARTED:
        return "Partida iniciada";

      case GameEventType.PAGE_OPENED:
        return `Pàgina ${event.pageIndex + 1}`;

      case GameEventType.CORRECT_ANSWER:
        return "Resposta correcta";

      case GameEventType.WRONG_ANSWER:
        return "Resposta incorrecta";

      case GameEventType.HINT_OPENED:
        return `Pista ${event.value} consultada`;

      case GameEventType.SOLUTION_OPENED:
        return "Solució consultada";

      case GameEventType.GAME_FINISHED:
        return "Partida finalitzada";

      default:
        return event.type;
    }
  }

  return (
    <>

      {summary.gameCompleted ? (
        <div className="text-2xl font-bold text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
          Enhorabona {summary.teamName}! Joc superat! 🎉
        </div>
      ) : (
        <div className="text-2xl font-bold text-center bg-orange-50 border border-orange-200 rounded-2xl p-8">
          😵 Oh {summary.teamName}... No heu superat el joc!
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Enigmes resolts
          </div>
          <div className="text-2xl font-bold">
            {summary.correctAnswers} de {summary.totalQuestions}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Temps utilitzat
          </div>
          <div className="text-2xl font-bold">
            {summary.usedSeconds}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Penalització acumulada
          </div>
          <div className="text-2xl font-bold">
            {summary.penaltySeconds}s
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Respostes errònies
          </div>
          <div className="text-2xl font-bold">
            {summary.wrongAnswers}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Pistes usades
          </div>
          <div className="text-2xl font-bold">
            {summary.hints}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Solucions consultades
          </div>
          <div className="text-2xl font-bold">
            {summary.solutions}
          </div>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center">
        <span className="text-5xl font-bold">{summary.score}</span> 
        <span className="text-xl ml-2">punts</span>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Historial
        </h3>
        <ul className="bg-white rounded-lg shadow p-4 space-y-2">
          {state.events.map((event, index) => (
            <li
              key={index}
              className="border-b border-gray-200 p-3"
            >
              <div className="flex justify-between text-sm">
                <div>
                  {describeEvent(event)}
                </div>
                <div className="text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </>    
  );
}