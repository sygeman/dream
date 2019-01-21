import { Children, cloneElement, FC, ReactElement } from 'react';
import styled from '../../theme';

const Box = styled.div`
  display: inline-flex;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  border-radius: 3px;
`;

const Group: FC = ({ children }) => (
  <Box>
    {Children.map(children, (child, index) =>
      cloneElement(child as ReactElement<any>, {
        isGroup: true,
        isFirst: index === 0,
        isLast: index + 1 === Children.count(children)
      })
    )}
  </Box>
);

export default Group;
