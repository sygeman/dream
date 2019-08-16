import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { CreateCommunityClip } from '../components/Community/Clip/Create';
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
    theme.dark2Color && lighten(0.01, theme.dark2Color)};
  display: flex;
  flex-direction: column;
  width: 640px;
`;

const NewCommunityClipPage: FC = () => (
  <Layout>
    <Box>
      <Container>
        <CreateCommunityClip />
      </Container>
    </Box>
  </Layout>
);

export default NewCommunityClipPage;
