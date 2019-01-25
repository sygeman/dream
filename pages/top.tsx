import Posts from '../components/Posts';
import Streams from '../components/Stream';

const TopPage = () => (
  <>
    <Streams />
    <Posts title="Топ за день" titleLink="/top/day" sort="topDay" rows={1} />
    <Posts
      title="Топ за неделю"
      titleLink="/top/week"
      sort="topWeek"
      rows={1}
    />
    <Posts
      title="Топ за месяц"
      titleLink="/top/month"
      sort="topMonth"
      rows={1}
    />
    <Posts
      title="Топ за все время"
      titleLink="/top/all"
      sort="topAll"
      rows={1}
    />
  </>
);

export default TopPage;
