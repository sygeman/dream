import Posts from '../components/Posts';
import Streams from '../components/Stream';

const HotPage = () => (
  <>
    <Streams />
    <Posts title="В тренде" sort={'hot'} />
  </>
);

export default HotPage;
