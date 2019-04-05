import config from '../config';
import Layout from '../layouts/Main';

const PayPage = () => (
  <Layout>
    <a href={`${config.apiUrl}robokassa/pay/100`}>Pay 100</a>
  </Layout>
);

export default PayPage;
