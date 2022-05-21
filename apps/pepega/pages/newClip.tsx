import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { CreateCommunityClip } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

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

const NewCommunityClipPage: FC = () => (
  <MainLayout>
    <Box>
      <Container>
        <CreateCommunityClip />
      </Container>
    </Box>
  </MainLayout>
);

export default NewCommunityClipPage;
