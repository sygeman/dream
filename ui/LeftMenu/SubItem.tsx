import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';

const SubItem = styled('a')<{
  active?: boolean;
}>`
  padding: 0 20px 0 70px;
  height: 32px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => darken(0.3, theme.text1Color)};
  background: ${({ theme, active }) =>
    active ? lighten(0.025, theme.dark2Color) : 'transparent'};

  :hover {
    background: ${({ theme }) => lighten(0.025, theme.dark2Color)};
  }

  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

interface IProps {
  router: RouterProps;
  route: string;
  active: boolean;
}

class SubItemMenu extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router, route, active, children } = this.props;

    return (
      <Link href={route} shallow passHref>
        <SubItem active={active || router.route === route}>
          <span>{children}</span>
        </SubItem>
      </Link>
    );
  }
}

export default withRouter(SubItemMenu);
