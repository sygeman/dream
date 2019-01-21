import { FC } from 'react';
import styled from '../theme';

const EmojiImg = styled.img`
  height: 1rem;
  margin: 0 0.05em 0 0.1em !important;
  min-height: 28px;
  min-width: 28px;
  object-fit: contain;
  vertical-align: -0.4em;
  width: 1rem;
`;

const emojiUrl = `https://ravepro.ams3.digitaloceanspaces.com/emojis/`;

interface IProps {
  id?: string;
  name: string;
}

const Emoji: FC<IProps> = ({ name, id }) => (
  <EmojiImg alt={name} src={`${emojiUrl}${id ? id : name.toLowerCase()}.png`} />
);

export default Emoji;
