import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Auth } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

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
  <MainLayout>
    <Box>
      <Container>
        <Auth />
      </Container>
    </Box>
  </MainLayout>
);

export default AuthPage;
