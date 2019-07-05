import Game from '../components/Game';
import Layout from '../layouts/Main';
import useRouter from '../hooks/useRouter';
import { Access } from '../helpers/Access';

const GamePage = () => {
  const router = useRouter();
  const gameId = router.query.id;

  return (
    <Layout>
      <Access>
        <Game gameId={gameId} />
      </Access>
    </Layout>
  );
};

export default GamePage;
