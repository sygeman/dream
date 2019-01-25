import Posts from '../components/Posts';
import Streams from '../components/Stream';

const NewPage = () => (
  <>
    <Streams />
    <Posts title="Новое" sort={'new'} />
  </>
);

export default NewPage;
