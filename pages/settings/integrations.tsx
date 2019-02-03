import * as Settings from '../../components/Settings';
import Integration from '../../components/Settings/Integration';
import { Access } from '../../helpers/Access';
import Layout from '../../layouts/Main';

const SettingsIntegrationsPage = () => (
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

export default SettingsIntegrationsPage;
