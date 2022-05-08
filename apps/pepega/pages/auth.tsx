import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import Auth from '../containers/Auth';
import Layout from '../layouts/Main';

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 40px 0;
`;

const Container = styled.div`
  padding: 10px;
  border-radius: 4px;
  background: ${({ theme }) =>
    theme.colors.surface && lighten(0.01, theme.colors.surface)};
  display: flex;
  flex-direction: column;
`;

const AuthPage: FC = () => (
  <Layout>
    <Box>
      <Container>
        <Auth />
      </Container>
    </Box>
  </Layout>
);

export default AuthPage;
