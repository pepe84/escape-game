import { useState } from "react";
import { GameLoaderService } from "../services/GameLoaderService";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import exampleGame from "../data/example-game.json";

export function HomePage() {
  
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [demoValid, setDemoValid] = useState<boolean>(false);

  const { setGame } = useGame();
  const navigate = useNavigate();

  const handleGame = (result) => {
    if (!result.success) {
      console.error(result.error.issues);
      setError(
        result.error.issues
          .map(i => `${i.path.join(".")} → ${i.message}`)
          .join("\n")
      );
      return;
    }

    console.log("Game OK", result.data);
    
    setGame(result.data);
    setError(null);  

    navigate("/game");
  }

  const handleLoadExample = () => {
    const result = GameLoaderService.validate(exampleGame);
    handleGame(result);
  };

  const handleLoadFile = async () => {
    if (!file) return;
    const text = await file.text();
    let json: unknown;

    try {
      json = JSON.parse(text);
    } catch (err) {
      setError("El fitxer no és un JSON vàlid");
      return;
    }

    const result = GameLoaderService.validate(json);
    handleGame(result);
  };

  return (

    <div className="py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2"> 
          <h1 className="text-3xl font-bold tracking-tight">
            Escape Game Engine
          </h1>
          <p className="text-sm text-white/70">
            Carrega un joc o utilitza el demo per començar
          </p>
        </div>

        {/* Demo section */}
        <div className="space-y-3">
          <button
            onClick={handleLoadExample}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold"
          >
            Validar joc demo
          </button>

          {demoValid && (
            <div className="text-emerald-300 text-sm text-center">
              ✔ Demo validat correctament
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* File upload */}
        <div className="space-y-3">
          <label className="block text-sm text-white/70">
            Carregar joc propi (.json)
          </label>

          <input
            type="file"
            accept=".json"
            onChange={(e) =>
              setFile(e.target.files?.[0] ?? null)
            }
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-slate-700 file:text-white
              hover:file:bg-slate-600"
          />

          <button
            onClick={handleLoadFile}
            disabled={!file}
            className={`w-full py-3 rounded-xl font-semibold transition
              ${file
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-600 cursor-not-allowed opacity-50"
              }`}
          >
            Carregar joc
          </button>
        </div>

        {/* Error panel */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm whitespace-pre-wrap">
            {error}
          </div>
        )}

      </div>
    </div>
  );
}