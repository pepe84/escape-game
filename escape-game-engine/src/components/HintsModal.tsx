import { useState } from "react";

export function HintsModal({
  hints,
  answer,
  unlockedCount,
  onUnlockHint,
  onUnlockSolution,
  onClose
}: any) {

  const [tab, setTab] = useState(0);

  const maxIndex =
    Math.min(unlockedCount, hints.length);

  const canShowSolution =
    unlockedCount >= hints.length;

  const unlockNextHint = () => {
    if (!canShowSolution) {
        onUnlockHint();
    }
    setTab(tab+1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[500px] p-4 space-y-4">

        <div className="flex justify-between">

            <div className="flex gap-2  pb-2">

            {hints.map((_: any, i: number) => (
                <button
                key={i}
                onClick={() => setTab(i)}
                disabled={i >= maxIndex}
                className={`px-3 py-1 text-sm rounded ${
                    i != tab && i <= maxIndex
                    ? "bg-gray-200"
                    : ""
                }${
                    i > maxIndex
                    ? " bg-gray-100 text-gray-400"
                    : ""
                }`}
                >
                Pista {i + 1}
                </button>
            ))}

            <button
                onClick={() => setTab(hints.length)}
                disabled={!canShowSolution}
                className="px-3 py-1 text-sm rounded bg-green-200"
            >
                Solució
            </button>

            </div>
            
            <button
            onClick={onClose}
            className="text-gray-500 px-4"
            >
            X
            </button>
        </div>

        <div className="min-h-[100px] text-gray-700">

          {tab < hints.length && (
            <p>{hints[tab]}</p>
          )}

          {tab === hints.length && canShowSolution && (
            <p className="font-bold text-green-800">
              {answer}
            </p>
          )}

        </div>


        {tab <= hints.length-1 && (
        <button
        onClick={unlockNextHint}
        className={`bg-blue-500 text-white px-3 py-1 rounded ${
            tab === hints.length-1
                ? "bg-red-700"
                : ""
            }`}
        >
        {tab === hints.length-1 && (
            <>Mostrar solució</>
        )}
        {tab < hints.length-1 && (
            <>Mostrar següent pista</>                
        )}
        </button>
        )}

      </div>

    </div>
  );
}