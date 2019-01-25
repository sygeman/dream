import Posts from '../components/Posts';
import Streams from '../components/Stream';

const IndexPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" sort="topDay" />
    <Posts title="В тренде" sort="hot" />
    <Posts title="Новое" sort="new" />
  </>
);

export default IndexPage;
