import { User } from '../../components/User/User';
import useRouter from '../../hooks/useRouter';
import Layout from '../../layouts/Main';

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.id;

  if (typeof userId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <User id={userId} />
    </Layout>
  );
};

export default UserPage;
