import Posts from '../../components/Posts';
import Streams from '../../components/Stream';

const TopWeekPage = () => (
  <>
    <Streams />
    <Posts title="Топ за неделю" sort="topWeek" />
  </>
);

export default TopWeekPage;
