import { FC, ReactNode } from 'react';
import { Access } from '../providers/Access';
import * as LeftMenu from '../ui/LeftMenu';
import BaseLayout from './Base';

interface IProps {
  fixedTopContent?: ReactNode;
}

const ManageLayout: FC<IProps> = ({ children, fixedTopContent }) => (
  <BaseLayout
    fixedTopContent={fixedTopContent}
    leftMenu={
      <Access allow={currentUser => currentUser.role === 'admin'}>
        <LeftMenu.Box>
          <LeftMenu.Item route="/manage" equal icon="chart" title="Dashboard" />
        </LeftMenu.Box>
      </Access>
    }
  >
    <Access allow={currentUser => currentUser.role === 'admin'}>
      {children}
    </Access>
  </BaseLayout>
);

export default ManageLayout;
