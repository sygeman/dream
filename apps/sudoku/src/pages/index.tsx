import { useNavigate } from "@solidjs/router";
import { HeaderButton } from "../components/header-button";
import { Layout } from "../components/layout";
import { DIFFICULTY } from "../constants";
import { generateBoard } from "../libs/generate-board";

const IndexPage = () => {
  const navigate = useNavigate();
  const generate = (difficulty = DIFFICULTY.easy) => {
    navigate(`/game/${generateBoard(difficulty)}`);
  };

  return (
    <Layout>
      <div class="scale-150 flex flex-col items-center">
        <div class="uppercase font-medium text-gray-400">New game</div>
        <div class="flex gap-1 mt-2">
          <HeaderButton onClick={() => generate(DIFFICULTY.easy)}>
            Easy
          </HeaderButton>
          <HeaderButton onClick={() => generate(DIFFICULTY.medium)}>
            Medium
          </HeaderButton>
          <HeaderButton onClick={() => generate(DIFFICULTY.hard)}>
            Hard
          </HeaderButton>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
