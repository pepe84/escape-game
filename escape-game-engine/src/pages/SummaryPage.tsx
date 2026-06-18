import { useGame } from "../context/GameContext";
import type { GameEvent } from "../models/GameEvent";
import { GameEventType } from "../models/GameEventType";
import { GameClockService } from "../services/GameClockService";
import { SummaryService } from "../services/SummaryService";

export function SummaryPage() {
  const { game, state } = useGame();
  const used = GameClockService.getUsedSeconds(game, state);

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
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Temps utilitzat
          </div>
          <div className="text-2xl font-bold">
            {GameClockService.formatSeconds(used)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Pistes utilitzades
          </div>
          <div className="text-2xl font-bold">
            {SummaryService.getHintsUsed(state)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Errors
          </div>
          <div className="text-2xl font-bold">
            {SummaryService.getWrongAnswers(state)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">
            Penalització acumulada
          </div>
          <div className="text-2xl font-bold">
            {state.penaltiesSeconds}s
          </div>
        </div>

      </div> 
      <div className="mt-8">

        <h3 className="text-lg font-semibold mb-4">
          Historial
        </h3>

        <ul className="bg-white rounded-lg shadow p-4 space-y-2">

          {state.events.map((event, index) => (

            <li
              key={index}
              className="border-b border-gray-300 p-3"
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