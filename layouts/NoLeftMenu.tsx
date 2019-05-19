import { FC, ReactNode } from 'react';
import BaseLayout from './Base';
import { TopStreams } from '../components/TopStreams';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
}

const NoLeftLayoutLayout: FC<IProps> = ({ children, fixedTopContent, streams }) => {
  return (
    <BaseLayout fixedTopContent={fixedTopContent}>
      <>
        {streams && <TopStreams />}
        {children}
      </>
    </BaseLayout>
  );
};

export default NoLeftLayoutLayout;
