import { FC } from "react";
import clsx from "clsx";
import { HeaderButton } from "./header-button";

interface EndProps {
  failures: number;
  newGame: () => void;
  reset: () => void;
}

export const End: FC<EndProps> = (props) => (
  <div className="absolute inset-0 w-full h-full flex items-center">
    <div
      className={clsx(
        "flex flex-col justify-center items-center",
        "w-full py-4 bg-indigo-900/80"
      )}
    >
      <div className="font-medium">Отлично!</div>
      <div className="font-medium text-xs text-gray-400">
        Ошибок: {props.failures}
      </div>
      <div className="flex gap-1 mt-2">
        <HeaderButton onClick={props.newGame}>Новая игра</HeaderButton>
        <HeaderButton onClick={props.reset}>Ещё раз</HeaderButton>
      </div>
    </div>
  </div>
);
