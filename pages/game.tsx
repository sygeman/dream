import Game from '../components/Game';
import Layout from '../layouts/Main';
import { useRouter } from '../hooks/useRouter';
import { useAccess } from '../hooks/useAccess';

const GamePage = () => {
  const router = useRouter();
  const gameId = router.query.id;

  return <Layout streams>{useAccess() && <Game gameId={gameId} />}</Layout>;
};

export default GamePage;
