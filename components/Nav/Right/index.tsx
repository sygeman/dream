import styled from 'styled-components';

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 340px;
  max-width: 340px;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const RightPanelBlock = styled.div`
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  overflow: hidden;
`;

export default {
  Box: RightPanel,
  Block: RightPanelBlock
};
