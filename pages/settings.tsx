import * as Settings from '../components/Settings';
import { Access } from '../providers/Access';
import Integration from '../components/Settings/Integration';
import Layout from '../layouts/Main';

const SettingsPage = () => (
  <Layout>
    <Settings.Box>
      <Access>
        <Settings.Title>Интеграции</Settings.Title>
        <Settings.Content>
          <Integration />
        </Settings.Content>
      </Access>
    </Settings.Box>
  </Layout>
);

export default SettingsPage;
