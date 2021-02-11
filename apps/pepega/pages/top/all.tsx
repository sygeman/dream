import { Clips } from '../../containers/Clips';
import Layout from '../../layouts/Main';

const TopAllPage = () => (
  <Layout streams>
    <Clips
      title="Топ за все время"
      description="Клипы за все время с самым высоким рейтингом"
      titleLink="/top/all"
      orderBy={{ name: 'clipRating', type: 'DESC' }}
    />
  </Layout>
);

export default TopAllPage;
