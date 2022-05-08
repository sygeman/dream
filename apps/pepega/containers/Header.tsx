import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@pepega/components';
import { useRouter } from 'next/router';
import { useAccess } from '@pepega/utils/useAccess';

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

export const Header = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) {
    return null;
  }

  return (
    <>
      <Left></Left>
      <Right>
        <UserBox>
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
