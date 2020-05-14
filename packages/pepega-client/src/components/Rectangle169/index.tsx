import styled from 'styled-components';

const Box = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Rectangle169 = ({ children }) => (
  <Box>
    <Inner>
      <Content>{children}</Content>
    </Inner>
  </Box>
);
