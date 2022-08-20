import clsx from "clsx";

export const CellCandidates = (props: {
  candidates: string;
  selected?: boolean;
  highlightLine?: boolean;
  highlightSame?: boolean;
  onClick?: () => void;
}) => (
  <button
    class={clsx(
      "flex flex-wrap justify-center items-center h-8 w-8 cursor-pointer rounded-sm",
      "font-medium text-white/30",
      props.selected
        ? "bg-indigo-900"
        : props.highlightSame
        ? "bg-transparent"
        : props.highlightLine
        ? "bg-slate-700/60"
        : "bg-slate-800/70"
    )}
    onClick={() => props.onClick && props.onClick()}
  >
    <div class="leading-[0.625rem] text-[0.688rem] scale-90">
      {props.candidates}
    </div>
  </button>
);
