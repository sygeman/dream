import useRouter from '../hooks/useRouter';
import Layout from '../layouts/Main';
import { User } from '../components/User/User';
import { Community } from '../components/Community/Community';

const ShortUrlPage = () => {
  const router = useRouter();
  const shortUrl = router.query.shortUrl;

  if (typeof shortUrl !== 'string') {
    return null;
  }

  if (shortUrl === 'sygeman') {
    return (
      <Layout>
        <User id="41e7e342-1d36-42a7-b82b-73b093c371db" />
      </Layout>
    );
  }

  if (shortUrl === 'twitchru') {
    return (
      <Layout>
        <Community id="5fd4ff46-3fd6-4313-b801-53212e1dc1f0" />
      </Layout>
    );
  }

  return <Layout>{shortUrl}</Layout>;
};

export default ShortUrlPage;
