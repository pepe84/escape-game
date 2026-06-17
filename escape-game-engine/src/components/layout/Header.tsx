import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        h-16
        bg-slate-900
        text-white
        border-b
        border-slate-700
        z-50
      "
    >
      <div className="h-full px-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-lg
              bg-emerald-500
              flex
              items-center
              justify-center
              font-bold
              text-slate-900
            "
          >
            <Brain size={24} />
          </div>

          <span className="font-semibold">
            Escape Game Engine
          </span>

        </div>

        <div
          className="
            font-mono
            text-xl
            font-bold
            tracking-wider
          "
        >
          00h:00m:00s
        </div>

      </div>
    </header>
  );
}