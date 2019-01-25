import Posts from '../../components/Posts';
import Streams from '../../components/Stream';

const TopDayPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" sort="topDay" />
  </>
);

export default TopDayPage;
