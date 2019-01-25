import styled from 'styled-components';
import Integration from '../components/Profile/Integration';
import { Access } from '../helpers/Access';

const Box = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`;

const SectionTitle = styled.div``;

const SectionContent = styled.div`
  padding: 10px 0;
`;

const SettingsPage = () => (
  <Box>
    <Access>
      <SectionTitle>Интеграции</SectionTitle>
      <SectionContent>
        <Integration />
      </SectionContent>
    </Access>
  </Box>
);

export default SettingsPage;
