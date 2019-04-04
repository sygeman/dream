import Posts from '../components/Posts';
import Streams from '../components/Streams/Grid';
import Layout from '../layouts/Main';

const IndexPage = () => (
  <Layout>
    <Streams />
    <Posts
      title="Топ за день"
      description="Клипы за 24 часа с самым высоким рейтингом"
      titleLink="/top/day"
      sort="topDay"
      rows={2}
    />
    <Posts
      title="Новое"
      description="Самые последние предложенные клипы"
      titleLink="/new"
      sort="new"
      rows={6}
    />
    <div
      style={{
        opacity: 0.5,
        display: 'flex',
        justifyContent: 'center',
        padding: 20
      }}
      dangerouslySetInnerHTML={{
        __html:
          '<a href="//www.free-kassa.ru/"><img src="//www.free-kassa.ru/img/fk_btn/15.png" title="Прием платежей на сайте"></a>'
      }}
    />
  </Layout>
);

export default IndexPage;
