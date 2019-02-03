import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import { darken, rgba } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';

const SubItem = styled('a')<{
  active?: boolean;
}>`
  padding: 0 20px 0 70px;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  cursor: pointer;
  color: ${({ theme }) => darken(0.2, theme.text1Color)};
  background: ${({ theme, active }) =>
    active ? rgba(theme.main1Color, 0.2) : 'transparent'};

  :hover {
    background: ${({ theme }) => rgba(theme.main1Color, 0.2)};
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
  active?: boolean;
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
