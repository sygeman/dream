import * as Settings from '../components/Settings';
import { Access } from '../helpers/Access';
import Layout from '../layouts/Main';
import { SWRow } from '../ui/SWRow';

const SettingsPage = () => (
  <Layout>
    <Settings.Box>
      <Access>
        <Settings.Title>Учетная запись</Settings.Title>
        <Settings.Content>Main</Settings.Content>
      </Access>
    </Settings.Box>
  </Layout>
);

export default SettingsPage;
