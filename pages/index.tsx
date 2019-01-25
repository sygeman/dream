import Posts from '../components/Posts';
import Streams from '../components/Stream';

const IndexPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" titleLink="/top/day" sort="topDay" rows={1} />
    <Posts title="В тренде" titleLink="/hot" sort="hot" row={1} />
    <Posts title="Новое" titleLink="/new" sort="new" />
  </>
);

export default IndexPage;
