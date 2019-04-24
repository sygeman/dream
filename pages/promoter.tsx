import * as Settings from '../components/Settings';
import { ChannelPromotersManage } from '../components/Settings/ChannelPromoters';
import { Access } from '../helpers/Access';
import Layout from '../layouts/Main';

const PromoterPage = () => (
  <Layout>
    <Settings.Box>
      <Access>
        <Settings.Title>Продвижение</Settings.Title>
        <Settings.Content>
          <ChannelPromotersManage />
        </Settings.Content>
      </Access>
    </Settings.Box>
  </Layout>
);

export default PromoterPage;
