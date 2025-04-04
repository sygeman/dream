import { HeaderButton } from "../components/header-button";
import { DIFFICULTY } from "../constants";

export const NewGame = (props: { onSelect: (difficulty: number) => void }) => (
  <div class="scale-150 flex flex-col items-center">
    <div class="uppercase font-medium text-gray-400">New game</div>
    <div class="flex gap-1 mt-2">
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
