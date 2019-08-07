import styled from 'styled-components';
import { lighten } from 'polished';
import Link from 'next/link';
import { useRouter } from '../../../hooks/useRouter';
import { Button } from '../../../ui';

const Box = styled.div`
  background: ${({ theme }) => theme.main1Color};
  margin-bottom: 20px;
  border-radius: 4px;
  height: 80px;
  display: flex;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.div`
  color: ${({ theme }) => lighten(0.5, theme.main1Color)};
  font-size: 16px;
`;

const Description = styled.div`
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  font-size: 12px;
`;

export const HowTo = () => {
  const router = useRouter();

  return (
    <Box>
      <Left>
        <Title>Как это работает?</Title>
        <Description>Размещение, позиция, списание и другое</Description>
      </Left>
      <Right>
        <Link
          as={`/help/promoter`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              howToPromoter: 1
            }
          }}
          passHref
        >
          <Button mainColor={'#956dd6'}>Почитать</Button>
        </Link>
      </Right>
    </Box>
  );
};
