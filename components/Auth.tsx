import { lighten } from 'polished';
import { FC } from 'react';
import { auth } from '../auth';
import styled from '../theme';
import { Icon } from '../ui/Icon';

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const AuthTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  padding: 16px 0 30px;
  color: ${({ theme }) => theme.accent2Color};
`;

const SocialForm = styled.div`
  display: flex;
  width: 600px;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const LoginButton = styled('div')<{
  cColor: string;
}>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 46px;
  font-size: 17px;
  margin: 5px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  background: ${props => props.cColor};

  :hover {
    background: ${props => lighten(0.2, props.cColor)};
  }

  i {
    margin-bottom: 2px;
    font-size: 22px;
  }
`;

const Auth: FC = () => (
  <AuthBox>
    <AuthTitle>Выберите наиболее удобную платформу для авторизации</AuthTitle>
    <SocialForm>
      <LoginButton cColor={'#507299'} onClick={() => auth('vkontakte')}>
        <Icon type="vk" />
      </LoginButton>
      <LoginButton cColor={'#DB4437'} onClick={() => auth('google')}>
        <Icon type="youtube-play" />
      </LoginButton>
      <LoginButton cColor={'#6542a6'} onClick={() => auth('twitch')}>
        <Icon type="twitch" />
      </LoginButton>
    </SocialForm>
  </AuthBox>
);

export default Auth;
