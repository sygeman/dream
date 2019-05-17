import * as Settings from '../components/Settings';
import { ChannelPromotersManage } from '../components/Settings/ChannelPromoters';
import { Access } from '../helpers/Access';
import Layout from '../layouts/Main';

const PromoterPage = () => (
  <Layout>
    <Settings.Box>
      <Settings.Title>Продвижение</Settings.Title>
      <Settings.Content>
        <Access>
          <ChannelPromotersManage />
        </Access>
      </Settings.Content>
    </Settings.Box>
  </Layout>
);

export default PromoterPage;
