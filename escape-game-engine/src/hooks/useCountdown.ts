import { useEffect, useMemo, useState, useRef } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { GameClockService } from "../services/GameClockService";
import { GameEngineService } from "../services/GameEngineService";
import { StorageService } from "../services/StorageService";

export function useCountdown() {

  const { game, state, setState } = useGame();
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  const hasNavigatedRef = useRef(false);

  useEffect(() => {

    if (state?.finished) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);

  }, [state?.finished]);

  const remainingSeconds = useMemo(() => {

    if (!game || !state) return 0;

    return GameClockService.getRemainingSeconds(game, state);

  }, [game, state, now]);

  const isFinished =
    state?.finished ||
    GameClockService.isTimeOver(game, state);

  useEffect(() => {

    if (!isFinished || !state || hasNavigatedRef.current) return;

    hasNavigatedRef.current = true;

    const finished = GameEngineService.finishGame(state);
    setState(finished);
    StorageService.saveState(finished);

    navigate("/summary");

  }, [isFinished, state]);

  return {
    remainingSeconds,
    formatted: GameClockService.formatSeconds(remainingSeconds),
    isFinished
  };
}