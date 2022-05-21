import { MainLayout } from '@dream/pepega/layouts/main';
import { Clips } from '@dream/pepega/containers-old';

const NewPage = () => (
  <MainLayout streams>
    <Clips title="Новое" description="Самые последние предложенные клипы" />
  </MainLayout>
);

export default NewPage;
