import styled from 'styled-components';
import { PromoterHelp } from 'src/containers/Help/Promoter';
import Layout from 'src/layouts/Main';

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0;
`;

const HelpPromoterPage = () => (
  <Layout>
    <Box>
      <PromoterHelp />
    </Box>
  </Layout>
);

export default HelpPromoterPage;
