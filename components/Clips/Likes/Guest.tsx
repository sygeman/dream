import Link from 'next/link';
import { darken } from 'polished';
import styled from 'styled-components';
import { useRouter } from '../../../hooks/useRouter';
import { Icon, Button } from '../../../ui/';

const Box = styled.div`
  padding: 40px;
  text-align: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  i {
    font-size: 52px;
    color: ${({ theme }) => darken(0.1, theme.accent2Color)};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin: 10px 0;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin: 10px 0;
  color: ${({ theme }) => darken(0.1, theme.accent2Color)};
`;

const ActionBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const ClipsLikesGuest = () => {
  const router = useRouter();

  return (
    <Box>
      <IconBox>
        <Icon type="thumb-up" />
      </IconBox>
      <Title>Понравившиеся клипы недоступны</Title>
      <Description>
        Чтобы посмотреть клипы которые вы оценили, войдите в аккаунт.
      </Description>
      <ActionBox>
        <Link
          as={`/auth?continue=${router.asPath}`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              authModal: 1
            }
          }}
          passHref
        >
          <Button>Войти</Button>
        </Link>
      </ActionBox>
    </Box>
  );
};
