import { FC } from "react";
import { HeaderButton } from "../components/header-button";
import { DIFFICULTY } from "../constants";

interface NewGameProps {
  onSelect: (difficulty: number) => void;
}

export const NewGame: FC<NewGameProps> = (props) => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="uppercase font-medium text-gray-400 text-base sm:text-lg md:text-xl">
      Новая игра
    </div>
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      <HeaderButton onClick={() => props.onSelect(DIFFICULTY.easy)}>
        Легко
      </HeaderButton>
      <HeaderButton onClick={() => props.onSelect(DIFFICULTY.medium)}>
        Средне
      </HeaderButton>
      <HeaderButton onClick={() => props.onSelect(DIFFICULTY.hard)}>
        Сложно
      </HeaderButton>
    </div>
  </div>
);
