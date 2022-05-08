import { useRouter } from 'next/router';
import Game from '../containers/Game';
import Layout from '../layouts/Main';

const GamePage = () => {
  const router = useRouter();
  const gameId = router.query.id;

  if (typeof gameId !== 'string' && typeof gameId !== 'undefined') {
    return null;
  }

  return (
    <Layout streams>
      <Game gameId={gameId} />
    </Layout>
  );
};

export default GamePage;
