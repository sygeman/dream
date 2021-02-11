import React, { FC } from 'react';
import styled from 'styled-components';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const EmojiImg = styled.img`
  height: 1rem;
  margin: 0 0.05em 0 0.1em !important;
  min-height: 28px;
  min-width: 28px;
  object-fit: contain;
  vertical-align: -0.4em;
  width: 1rem;
`;

interface IProps {
  id?: string;
  name: string;
}

export const Emoji: FC<IProps> = ({ name, id }) => (
  <EmojiImg
    alt={name}
    src={`${publicRuntimeConfig.cdnUrl}emojis/${
      id ? id : name.toLowerCase()
    }.png`}
  />
);
