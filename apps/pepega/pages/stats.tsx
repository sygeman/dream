import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Stats } from '../containers/Stats';
import Layout from '../layouts/Main';

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 40px 0;
`;

const Container = styled.div`
  padding: 20px;
  background: ${({ theme }) =>
    theme.colors.surface && lighten(0.01, theme.colors.surface)};
  display: flex;
  flex-direction: column;
  width: 640px;
`;

const StatsPage: FC = () => (
  <Layout>
    <Box>
      <Container>
        <Stats />
      </Container>
    </Box>
  </Layout>
);

export default StatsPage;
