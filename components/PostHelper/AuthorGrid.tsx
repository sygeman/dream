import gql from 'graphql-tag';
import Link from 'next/link';
import * as React from 'react';
import { Query } from 'react-apollo';

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

interface IProps {
  id: string;
}

export default class PostAuthor extends React.Component<IProps> {
  public render() {
    const { id } = this.props;

    return (
      <Query query={GET_USER} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div />;
          }

          if (error || !data.user) {
            return null;
          }

          return <Link href={`user?id=${id}`}>{data.user.name}</Link>;
        }}
      </Query>
    );
  }
}
