import Posts from '../components/Posts';
import Streams from '../components/Stream';

const IndexPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" sort="topDay" rows={1} />
    <Posts title="В тренде" sort="hot" row={1} />
    <Posts title="Новое" sort="new" />
  </>
);

export default IndexPage;
