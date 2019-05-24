import Link from 'next/link';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';
import { Button, Grid, CardMedia } from '../../ui';

const Box = styled.div`
  padding: 10px 20px;
`;

const Header = styled.div`
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CommunityAvatar = styled.div`
  width: 100%;
  height: 100%;
`;

const CommunitiesBox = styled.div``;

const CommunityBox = styled.div``;

export const Communities = ({ communities }) => {
  const router = useRouter();

  return (
    <Box>
      <CommunitiesBox>
        <Grid
          beforeRender={
            <Header>
              <Link
                as={`/newCommunity`}
                href={{
                  pathname: router.route,
                  query: {
                    ...router.query,
                    newCommunity: 1
                  }
                }}
                passHref
              >
                <Button>Создать сообщество</Button>
              </Link>
            </Header>
          }
          items={communities}
          elementWidth={300}
          itemRender={community => (
            <CommunityBox key={community.id}>
              <CardMedia
                media={
                  <Link href={`/community?id=${community.id}`} passHref>
                    <PreviewContent>
                      {community.avatar && (
                        <CommunityAvatar
                          style={{
                            background: `url("${
                              community.avatar
                            }") no-repeat center center / cover`
                          }}
                        />
                      )}
                    </PreviewContent>
                  </Link>
                }
                title={community.name}
                description={community.description}
                count={228}
                countIcon={'accounts'}
              />
            </CommunityBox>
          )}
        />
      </CommunitiesBox>
    </Box>
  );
};
