import * as Settings from '../../components/Settings';
import { Access } from '../../helpers/Access';
import Layout from '../../layouts/Main';
import { SWRow } from '../../ui/SWRow';

const SettingsAppearancePage = () => (
  <Layout>
    <Settings.Box>
      <Access>
        <Settings.Title>Внешний вид</Settings.Title>
        <Settings.Content>
          <SWRow
            title="Размытый фон"
            description="Размывать фон у модальных окон"
            onChange={() => console.log('')}
            active
          />
        </Settings.Content>
      </Access>
    </Settings.Box>
  </Layout>
);

export default SettingsAppearancePage;
