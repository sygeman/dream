import Game from '../components/Game';
import Layout from '../layouts/Main';
import { useRouter } from '../hooks/useRouter';

const GamePage = () => {
  const router = useRouter();
  const gameId = router.query.id;

  return (
    <Layout streams>
      <Game gameId={gameId} />
    </Layout>
  );
};

export default GamePage;
