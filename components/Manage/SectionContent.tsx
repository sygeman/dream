import { FC } from 'react';
import Dashboard from './Dashboard';
import PinnedPosts from './PinnedPosts';
import Streams from './Streams';
import Tags from './Tags';

interface IProps {
  name: string;
}

const SectionContent: FC<IProps> = ({ name }) => {
  switch (name) {
    case 'streams':
      return <Streams />;
    case 'pinposts':
      return <PinnedPosts />;
    case 'tags':
      return <Tags />;
    default:
      return <Dashboard />;
  }
};

export default SectionContent;
