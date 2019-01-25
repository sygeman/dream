import Posts from '../../components/Posts';
import Streams from '../../components/Stream';

const TopAllPage = () => (
  <>
    <Streams />
    <Posts title="Топ за все время" sort="topAll" />
  </>
);

export default TopAllPage;
