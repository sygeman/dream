import { FC, ReactNode } from 'react';
import { useAccess } from '../hooks/useAccess';
import * as LeftMenu from '../ui/LeftMenu';
import BaseLayout from './Base';

interface IProps {
  fixedTopContent?: ReactNode;
}

const ManageLayout: FC<IProps> = ({ children, fixedTopContent }) => {
  const [{ allow: isAllow }] = useAccess();

  if (!isAllow) {
    return null;
  }

  return (
    <BaseLayout
      fixedTopContent={fixedTopContent}
      leftMenu={
        <LeftMenu.Box>
          <LeftMenu.Item route="/manage" equal icon="chart" title="Dashboard" />
        </LeftMenu.Box>
      }
    >
      {children}
    </BaseLayout>
  );
};

export default ManageLayout;
