import styled from 'styled-components';
import Integration from '../components/Profile/Integration';
import { Access } from '../helpers/Access';
import Layout from '../layouts/Main';

const Box = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SectionTitle = styled.div``;

const SectionContent = styled.div`
  padding: 10px 0;
`;

const SettingsPage = () => (
  <Layout>
    <Box>
      <Access>
        <SectionTitle>Интеграции</SectionTitle>
        <SectionContent>
          <Integration />
        </SectionContent>
      </Access>
    </Box>
  </Layout>
);

export default SettingsPage;
