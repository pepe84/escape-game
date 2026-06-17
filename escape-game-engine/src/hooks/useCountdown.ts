import { useEffect, useMemo, useState } from "react";
import { useGame } from "../context/GameContext";
import { formatTime } from "../utils/formatTime";
import { GameEngineService } from "../services/GameEngineService";
import { StorageService } from "../services/StorageService";
import { useNavigate } from "react-router-dom";

export function useCountdown() {
  const { game, state, setState } = useGame();
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const remainingSeconds = useMemo(() => {
    if (!game || !state) return 0;

    const start = new Date(state.startedAt).getTime();
    const elapsed = Math.floor((now - start) / 1000);

    const total = game.durationMinutes * 60;
    const penalties = state.penaltiesSeconds;

    return Math.max(total - elapsed - penalties, 0);
  }, [game, state, now]);

  const isFinished = remainingSeconds <= 0;

  useEffect(() => {
    if (!isFinished || !state || state.finished) return;

    const finished = GameEngineService.finishGame(state);

    setState(finished);
    StorageService.saveState(finished);

    navigate("/summary");

  }, [isFinished]);

  return {
    remainingSeconds,
    formatted: formatTime(remainingSeconds),
    isFinished
  };
}