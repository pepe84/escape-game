import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { GameLoaderService } from "../services/GameLoaderService";
import exampleGame from "../data/example-game.json";

export function HomePage() {
  const { setGame, state } = useGame();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state && !state.finished) navigate("/game");
  }, [state]);

  const handleGame = (result) => {
    if (!result.success) {
      console.error(result.error.issues);
      setError(
        result.error.issues
          .map(i => `${i.path.join(".")} → ${i.message}`)
          .join("\n")
      );
    } else {
      console.log("Game OK", result.data);
      setGame(result.data);
      setError(null);  
      navigate("/start");
    }
  }

  const loadExample = () => {
    const result = GameLoaderService.validate(exampleGame);
    handleGame(result);
  };

  const loadFile = async () => {
    if (!file) return;

    const text = await file.text();
    const json = JSON.parse(text);
    const result = GameLoaderService.validate(json);

    handleGame(result);
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Escape Game Engine</h1>

      <button onClick={loadExample} className="w-full bg-emerald-500 text-white py-3 rounded-xl">
        Carregar demo
      </button>

      <input type="file" accept=".json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

      <button onClick={loadFile} className="w-full bg-blue-500 text-white py-3 rounded-xl">
        Carregar joc
      </button>

      {error && <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>}
    </>
  );
}