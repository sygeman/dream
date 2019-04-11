import config from '../config';
import Layout from '../layouts/Main';

const PayPage = () => (
  <Layout>
    <a href={`${config.apiUrl}robokassa/buy/real/100`}>Купить 100 RealCoin</a>
  </Layout>
);

export default PayPage;
