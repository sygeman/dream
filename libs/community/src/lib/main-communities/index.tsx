import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { useIntl } from 'react-intl';
import {
  useCommunitiesQuery,
  useMeQuery,
  useUniqCountQuery,
  useSetUserLocaleMutation,
  Locale,
} from '@dream/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { gql, useApolloClient, useQuery } from '@apollo/client';

const CommunityCard: React.FC<{
  title: string;
  name: string;
  online: number;
}> = ({ title, name, online }) => {
  return (
    <Link href={`/${name}`}>
      <div className="flex flex-col flex-shrink-0 overflow-hidden items-center justify-center  cursor-pointer hover:opacity-90 bg-surface m-4 rounded">
        <div className="w-full bg-surface-light py-12"></div>
        <div className="flex items-center justify-between w-full px-4 py-2">
          <span className="text-sm text-white">{title}</span>
          <span className="text-white text-xs rounded bg-backgorud px-2 py-1">
            {online}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const MainCommunities = () => {
  const client = useApolloClient();

  const intl = useIntl();
  const router = useRouter();
  const userQuery = useMeQuery();
  const user = userQuery?.data?.me;

  const [setUserLocale] = useSetUserLocaleMutation();

  const clientLocaleQuery = useQuery(gql`
    query clientLocale {
      clientLocale @client
    }
  `);

  const clientLocale = clientLocaleQuery?.data?.clientLocale;
  const locale = user?.locale || clientLocale || Locale.EnUs;

  const setLocale = (locale: Locale) => {
    if (isUser) {
      setUserLocale({
        variables: { locale },
        update() {
          userQuery.refetch();
        },
      });
    }

    localStorage.setItem('locale', locale);
    client.cache.evict({ fieldName: 'clientLocale' });
    client.cache.gc();
  };

  const isUser = !!user;

  const communitiesQuery = useCommunitiesQuery({ pollInterval: 3000 });
  const communities = communitiesQuery?.data?.communities || [];

  const uniqCountQuery = useUniqCountQuery({ pollInterval: 3000 });
  const uniqCount = uniqCountQuery?.data?.uniqCount || 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between items-center px-4 py-2 bg-surface">
        <div className="flex flex-1">
          <span className="text-accent">
            {intl.formatMessage({ id: 'mainOnlineLabel' })}:
          </span>
          <span className="text-white ml-2">{uniqCount}</span>
        </div>
        <FontAwesomeIcon icon={faLanguage} className="text-accent mr-1 h-6" />
        <select
          className="mx-2"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          <option value={Locale.EnUs}>English</option>
          <option value={Locale.RuRu}>Русский</option>
        </select>
        <Link
          as={isUser ? `/communities/new` : `/auth?continue=/communities/new`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              [isUser ? 'newCommunity' : 'authModal']: 1,
            },
          }}
          passHref
        >
          <button className="btn btn-primary">
            {intl.formatMessage({ id: 'createCommunityButton' })}
          </button>
        </Link>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-4 py-4 auto-rows-max gap-2 justify-center overflow-y-auto">
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                name={community.name}
                title={community.title}
                online={community.onlineCount}
              />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};
