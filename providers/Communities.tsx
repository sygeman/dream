import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query communities {
    communities {
      id
      name
      description
      avatar
    }
  }
`;

interface IPropsInner {
  communities: any;
  children: any;
}

class Inner extends Component<IPropsInner> {
  public render() {
    return this.props.children({
      communities: this.props.communities
    });
  }
}

interface IProps {
  children: any;
}

const Provider: FC<IProps> = ({ children }) => (
  <Query query={GET}>
    {({ loading, error, data }) => {
      if (loading || error || !data || !data.communities) {
        return null;
      }

      return <Inner communities={data.communities}>{children}</Inner>;
    }}
  </Query>
);

export default Provider;
