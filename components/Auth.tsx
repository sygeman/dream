import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import config from '../config';
import { Icon } from '../ui';

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  max-width: 500px;
  width: 500px;
`;

const AuthTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  padding: 16px 0 20px;
  color: ${({ theme }) => theme.accent2Color};
`;

const SocialForm = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const LoginButton = styled('a')<{
  cColor: string;
}>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 44px;
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
    font-size: 20px;
  }
`;

const Auth: FC = () => (
  <AuthBox>
    <AuthTitle>Выберите наиболее удобную для Вас платформу</AuthTitle>
    <SocialForm>
      <LoginButton cColor={'#507299'} href={`${config.apiUrl}auth/vkontakte`}>
        <Icon type="vk" />
      </LoginButton>
      <LoginButton cColor={'#DB4437'} href={`${config.apiUrl}auth/google`}>
        <Icon type="google" />
      </LoginButton>
      <LoginButton cColor={'#6542a6'} href={`${config.apiUrl}auth/twitch`}>
        <Icon type="twitch" />
      </LoginButton>
    </SocialForm>
  </AuthBox>
);

export default Auth;
