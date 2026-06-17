import { FolderGit2 } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="
        border-t
        border-slate-200
        py-4
        text-sm
        text-slate-600
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <a
          href="https://github.com/TEU_USUARI/TEU_REPO"
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            gap-2
            hover:text-slate-900
          "
        >
          <FolderGit2 size={18} />

          <span>
            GNU General Public License v3.0
          </span>
        </a>
      </div>
    </footer>
  );
}