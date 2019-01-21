import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { Query } from 'react-apollo';
import styled from '../../theme';
import Avatar from '../Avatar';

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      role
      mainProfile {
        id
        name
        avatar
      }
    }
  }
`;

const AuthorBox = styled.div`
  display: flex;
  margin-left: auto;
  padding: 0 20px;
  height: 100%;
`;

const AuthorData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 550px) {
    display: none;
  }
`;

const AuthorName = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  cursor: pointer;
`;

const DateBox = styled.div`
  display: flex;
  font-size: 11px;
  color: ${({ theme }) => theme.accent2Color};
  justify-content: flex-end;
`;

const AuthorAvatarBox = styled.div`
  margin-left: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

interface IProps {
  createdAt: string;
  authorId: string;
  metaDescription?: boolean;
}

export default class PostAuthor extends React.Component<IProps> {
  public render() {
    const { createdAt, authorId, metaDescription } = this.props;

    return (
      <Query query={GET_USER} variables={{ id: authorId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div />;
          }

          if (error || !data.user || !data.user.mainProfile) {
            return null;
          }

          return (
            <AuthorBox>
              {metaDescription && (
                <Head>
                  <meta
                    property="og:description"
                    content={data.user.mainProfile.name}
                  />
                </Head>
              )}
              <AuthorData>
                <Link href={`user?id=${authorId}`}>
                  <AuthorName>{data.user.mainProfile.name}</AuthorName>
                </Link>
                <DateBox>
                  {distanceInWordsToNow(parseInt(createdAt, 10), {
                    locale: ruLocale
                  })}
                  {' назад'}
                </DateBox>
              </AuthorData>
              <AuthorAvatarBox>
                <Link href={`user?id=${authorId}`}>
                  <Avatar avatar={data.user.mainProfile.avatar} />
                </Link>
              </AuthorAvatarBox>
            </AuthorBox>
          );
        }}
      </Query>
    );
  }
}
