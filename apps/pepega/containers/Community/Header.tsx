import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Flex, Button } from '@pepega/components';
import { useAccess } from '@pepega/utils/useAccess';
import { CommunityFollow } from './Follow';

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0 5px;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const UserBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const NewClipButton = styled(Button)`
  height: 30px;
`;

const GET_COMMUNITY = gql`
  query community($id: ID!) {
    community(id: $id) {
      id
      name
      avatar
    }
  }
`;

export const CommunityHeader = () => {
  const router = useRouter();
  const [{ allow: isUser }] = useAccess();
  const communityId = router.query.id;

  if (typeof communityId !== 'string') {
    return null;
  }

  const { loading, error, data } = useQuery(GET_COMMUNITY, {
    variables: { id: communityId },
    ssr: false
  });

  if (loading || error) {
    return null;
  }

  const community = data.community;

  return (
    <>
      <Left>
        <Flex
          mx="6px"
          height="28px"
          width="28px"
          bg="accent"
          borderRadius="100%"
          overflow="hidden"
        ></Flex>
        <Flex mx="6px" fontSize="14px">
          {community.name}
        </Flex>
      </Left>
      <Right>
        <UserBox>
          <CommunityFollow communityId={communityId} />
          <Links>
            <Link
              as={isUser ? `/newClip` : `/auth?continue=/newClip`}
              href={{
                pathname: router.route,
                query: {
                  ...router.query,
                  [isUser ? 'newClip' : 'authModal']: 1
                }
              }}
              passHref
            >
              <NewClipButton>Предложить клип</NewClipButton>
            </Link>
          </Links>
        </UserBox>
      </Right>
    </>
  );
};
