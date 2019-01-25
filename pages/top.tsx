import Posts from '../components/Posts';
import Streams from '../components/Stream';

const TopPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" sort="topDay" rows={1} />
    <Posts title="Топ за неделю" sort="topWeek" rows={1} />
    <Posts title="Топ за месяц" sort="topMonth" rows={1} />
    <Posts title="Топ за все время" sort="topAll" rows={1} />
  </>
);

export default TopPage;
