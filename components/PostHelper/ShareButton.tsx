import { darken } from 'polished';
import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton
} from 'react-share';

import styled from '../../theme';
import Dropdown from '../Dropdown';
import Icon from '../Icon';

const ShareButton = styled.div`
  height: 100%;
  width: 60px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  cursor: pointer;

  i {
    transform: scaleX(-1);
    font-size: 21px;
    color: ${({ theme, active }) => (active ? '#cc2939' : theme.accent2Color)};
  }
`;

const ShareMenu = styled.div`
  display: flex;
  background: ${({ theme }) => theme.dark1Color};
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
    background: ${({ theme }) => darken(0.05, theme.dark1Color)};
  }
`;

const CopyLinkButton = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: ${({ theme }) => theme.main1Color};
`;

interface IProps {
  id: string;
}

export default class extends React.Component<IProps> {
  public renderMenu = (id: string) => {
    const url = `https://twitchru.com/post?id=${id}`;

    return (
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
              <Icon type="copy" />
            </CopyLinkButton>
          </CopyToClipboard>
        </ShareMenuItem>
      </ShareMenu>
    );
  };

  public render() {
    const { id } = this.props;

    return (
      <Dropdown overlay={this.renderMenu(id)}>
        <ShareButton>
          <Icon type="mail-reply" />
        </ShareButton>
      </Dropdown>
    );
  }
}
