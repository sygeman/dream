import { darken, lighten, rgba } from 'polished';
import * as React from 'react';
// import UserProvider from '../providers/User';
import styled from '../../theme';
import { shortNumbers } from '../../utils/count';
import Icon from '../Icon';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    ${({ theme }) => lighten(0.02, theme.dark2Color)},
    ${({ theme }) => darken(0.02, theme.dark2Color)}
  );
`;

const UserAvatar = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 30px 5px;
  position: relative;
`;

const UserAvatarImg = styled.img`
  height: 44px;
  width: 44px;
  border-radius: 100%;
  overflow: hidden;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding: 10px 0 16px;
`;

const UserData = styled.div`
  justify-content: center;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background: ${({ theme }) => theme.main1Color};
`;

const StatsOneBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-direction: column;
`;

const StatsOneCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const StatsOneTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${({ theme }) => rgba(theme.text1Color, 0.5)};
  font-size: 12px;
`;

const SocialLinks = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialLink = styled.div`
  padding: 4px 8px;
  font-size: 14px;
`;

const StatsOne = ({ count, title }) => (
  <StatsOneBox>
    <StatsOneCount>{shortNumbers(count)}</StatsOneCount>
    <StatsOneTitle>{title}</StatsOneTitle>
  </StatsOneBox>
);

const SocialLinkOne = ({ profile }) => {
  let iconType = '';
  let socialLink = '';

  switch (profile.serviceName) {
    case 'twitch':
      iconType = 'twitch';
      socialLink = `https://www.twitch.tv/${profile.name.toLowerCase()}`;
      break;
    case 'vkontakte':
      iconType = 'vk';
      socialLink = `https://vk.com/id${profile.serviceId}`;
      break;
    case 'google':
      iconType = 'google';
      socialLink = `https://plus.google.com/${profile.serviceId}`;
      break;
  }

  return (
    <a href={socialLink} target="_blank">
      <SocialLink>
        <Icon type={iconType} />
      </SocialLink>
    </a>
  );
};

export const PanelProfile = ({ user }) => (
  <Box>
    <UserAvatar>
      <SocialLinks>
        {user.profiles.map(profile => (
          <SocialLinkOne key={profile.id} profile={profile} />
        ))}
      </SocialLinks>
      <UserAvatarImg src={user.mainProfile.avatar} />
    </UserAvatar>
    <UserData>
      <UserName>{user.mainProfile.name}</UserName>
      <Stats>
        <StatsOne count={user.postsCount} title="Клипы" />
      </Stats>
    </UserData>
  </Box>
);

export default PanelProfile;
