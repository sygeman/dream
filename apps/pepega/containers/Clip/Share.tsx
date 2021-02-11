import { darken } from 'polished';
import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
} from 'react-share';
import styled from 'styled-components';
import { Dropdown } from '@dream/pepega-ui';
import { Share as ShareIcon } from 'styled-icons/material';
import { FileCopy as CopyIcon } from 'styled-icons/remix-fill';

const ShareButton = styled.div`
  height: 100%;
  width: 60px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

const ShareMenu = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ShareMenuItem = styled.div`
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    background: ${({ theme }) => darken(0.05, theme.colors.background)};
  }
`;

const CopyLinkButton = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.primary};
`;

interface IProps {
  clipId: string;
}

export const ClipShare: FC<IProps> = ({ clipId }) => {
  const url = `https://pepega.com/clip?id=${clipId}`;

  return (
    <Dropdown
      overlay={
        <ShareMenu>
          <ShareMenuItem>
            <VKShareButton url={url}>
              <VKIcon size={32} />
            </VKShareButton>
          </ShareMenuItem>
          <ShareMenuItem>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} />
            </TwitterShareButton>
          </ShareMenuItem>
          <ShareMenuItem>
            <CopyToClipboard text={url}>
              <CopyLinkButton>
                <CopyIcon size="20px" />
              </CopyLinkButton>
            </CopyToClipboard>
          </ShareMenuItem>
        </ShareMenu>
      }
    >
      <ShareButton>
        <ShareIcon size="20px" />
      </ShareButton>
    </Dropdown>
  );
};
