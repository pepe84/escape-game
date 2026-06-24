import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { GameLoaderService } from "../services/GameLoaderService";
import exampleGame from "../../public/data/example-game.json";
import { useTranslation, Trans } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  const { setGame, state } = useGame();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state && !state.finished) navigate("/game");
    if (state?.finished) navigate("/summary");
  }, [state]);

  const handleGame = (result: any) => {
    if (!result.success) {
      const issues = (result.error as any)?.issues ?? [];
      setError(
        issues.length 
          ? issues.map(i => `${i.path.join(".")} → ${i.message}`)
            .join("\n")
          : t("homePage.loadingError")
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
    const result = await GameLoaderService.loadFromFile(file);
    handleGame(result);
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Escape Game Engine</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold">
            {t("homePage.section1.title")}
          </h2>
          <div className="text-gray-500 mt-4 h-50">
            {t("homePage.section1.body")}
          </div>
          <button onClick={loadExample} className="w-full bg-emerald-500 text-white py-3 rounded-xl">
            {t("homePage.section1.btn")}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold">
            {t("homePage.section2.title")}
          </h2>
          <div className="text-gray-500 mt-4 h-44">
            <Trans
              i18nKey="homePage.section2.body"
              components={{
                csvLink: (<a href="/data/example-game.csv" download />),
                jsonLink: (<a href="/data/example-game.json" download />),
              }}
            />
          </div>
          <div>
            <input type="file" accept=".json,.csv" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <button onClick={loadFile} className="w-full bg-blue-500 text-white py-3 rounded-xl">
              {t("homePage.section2.btn")}
            </button>
            {error && <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>}
          </div>
        </div>

      </div>
    </>
  );
}