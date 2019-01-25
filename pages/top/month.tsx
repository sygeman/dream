import Posts from '../../components/Posts';
import Streams from '../../components/Stream';

const TopMonthPage = () => (
  <>
    <Streams />
    <Posts title="Топ за месяц" sort="topMonth" />
  </>
);

export default TopMonthPage;
