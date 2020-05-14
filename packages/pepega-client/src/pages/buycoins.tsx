import styled from 'styled-components';
import { BuyCoins } from 'src/containers/BuyCoins';
import Layout from 'src/layouts/Main';

const Box = styled.div`
  display: flex;
  max-width: 500px;
  margin: 40px auto;
  border-radius: 6px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.surface};
`;

const BuyCoinsPage = () => (
  <Layout>
    <Box>
      <BuyCoins />
    </Box>
  </Layout>
);

export default BuyCoinsPage;
