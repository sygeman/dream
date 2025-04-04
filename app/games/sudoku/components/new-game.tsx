import { FC } from "react";
import { HeaderButton } from "../components/header-button";
import { DIFFICULTY } from "../constants";

interface NewGameProps {
  onSelect: (difficulty: number) => void;
}

export const NewGame: FC<NewGameProps> = (props) => (
  <div className="scale-150 flex flex-col items-center">
    <div className="uppercase font-medium text-gray-400">New game</div>
    <div className="flex gap-1 mt-2">
      <HeaderButton onClick={() => props.onSelect(DIFFICULTY.easy)}>
        Easy
      </HeaderButton>
      <HeaderButton onClick={() => props.onSelect(DIFFICULTY.medium)}>
        Medium
      </HeaderButton>
      <HeaderButton onClick={() => props.onSelect(DIFFICULTY.hard)}>
        Hard
      </HeaderButton>
    </div>
  </div>
);
