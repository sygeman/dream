import { darken, lighten } from 'polished';
import styled from 'styled-components';

const Box = styled.a`
  background: radial-gradient(
    ${({ theme }) => lighten(0.02, theme.dark2Color)},
    ${({ theme }) => darken(0.02, theme.dark2Color)}
  );
  padding: 10px 80px 0;
  display: block;
`;

const discordLink = 'https://discord.gg/xVprhFC';
const discordImg =
  'https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg';

const Discord = () => (
  <Box href={discordLink} target="_blank">
    <img src={discordImg} />
  </Box>
);

export default Discord;
