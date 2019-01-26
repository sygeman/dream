import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';

const Item = styled.a`
  font-size: 14px;
  position: relative;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${({ active, theme }) =>
    active && lighten(0.05, theme.dark2Color)};

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.dark2Color)};
  }

  i {
    height: 100%;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 20px;
    font-size: 19px;
    color: ${({ theme }) => theme.accent2Color};
  }
`;

const SubItemMenuBox = styled.div``;

interface IProps {
  router: RouterProps;
  route: string;
  title: string;
  icon: string;
  equal: boolean;
}

class MenuItem extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router, route, title, icon, children, equal } = this.props;

    const active = equal
      ? router.route === route
      : router.route.search(`${route}`) >= 0;

    return (
      <>
        <Link href={route} shallow passHref>
          <Item active={active}>
            <Icon type={icon} /> {title}
          </Item>
        </Link>
        {active && <SubItemMenuBox>{children}</SubItemMenuBox>}
      </>
    );
  }
}

export default withRouter(MenuItem);
