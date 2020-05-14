import Link from 'next/link';
import { darken } from 'polished';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button, Grid, CardMedia } from 'src/components';
import { useAccess } from 'src/hooks/useAccess';

const Box = styled.div`
  padding: 10px 20px;
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

const SectionBox = styled.div`
  padding: 40px 5px 10px;
  display: flex;
`;

const SectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SectionRight = styled.div``;

const SectionTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;

  a {
    cursor: pointer;
  }
`;

const SectionDescription = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  color: ${({ theme }) => darken(0.4, theme.colors.text)};
`;

const CommunitiesBox = styled.div``;

const CommunityBox = styled.div`
  margin: 6px;
`;

export const Communities = ({ communities }) => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) {
    return null;
  }

  return (
    <Box>
      <CommunitiesBox>
        <Grid
          beforeRender={
            <SectionBox>
              <SectionLeft>
                <SectionTitle>Сообщества</SectionTitle>
                <SectionDescription>Список всех сообществ</SectionDescription>
              </SectionLeft>
              <SectionRight>
                <Link
                  as={isUser ? `/newCommunity` : `/auth?continue=/newCommunity`}
                  href={{
                    pathname: router.route,
                    query: {
                      ...router.query,
                      [isUser ? 'newCommunity' : 'authModal']: 1
                    }
                  }}
                  passHref
                >
                  <Button>Создать сообщество</Button>
                </Link>
              </SectionRight>
            </SectionBox>
          }
          items={communities}
          elementWidth={320}
          itemRender={community => (
            <CommunityBox key={community.id}>
              <CardMedia
                media={
                  <Link href={`/community?id=${community.id}`} passHref>
                    <PreviewContent>
                      {community.avatar && (
                        <CommunityAvatar
                          style={{
                            background: `url("${community.avatar}") no-repeat center center / cover`
                          }}
                        />
                      )}
                    </PreviewContent>
                  </Link>
                }
                title={community.name}
                description={community.description}
                count={0}
              />
            </CommunityBox>
          )}
        />
      </CommunitiesBox>
    </Box>
  );
};
