import Posts from '../components/Posts';
import Streams from '../components/Stream';

const TopPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" sort="topDay" />
    <Posts title="Топ за неделю" sort="topWeek" />
    <Posts title="Топ за месяц" sort="topMonth" />
    <Posts title="Топ за все время" sort="topAll" />
  </>
);

export default TopPage;
