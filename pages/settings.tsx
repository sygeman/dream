import * as Settings from '../components/Settings';
import { Access } from '../helpers/Access';
import Layout from '../layouts/Main';

const SettingsPage = () => (
  <Layout>
    <Settings.Box>
      <Access>
        <Settings.Title>Учетная запись</Settings.Title>
        <Settings.Content />
      </Access>
    </Settings.Box>
  </Layout>
);

export default SettingsPage;
