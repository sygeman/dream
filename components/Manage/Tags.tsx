import gql from 'graphql-tag';
import { createRef, FC } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import { Input } from '../../ui/Input';
import Tag from '../Tag';

const GET_TAGS = gql`
  query tags {
    tags {
      id
      title
    }
  }
`;

const CREATE_TAG = gql`
  mutation createTag($title: String!) {
    createTag(title: $title) {
      id
      title
    }
  }
`;

const REMOVE_TAG = gql`
  mutation removeTag($id: ID!) {
    removeTag(id: $id)
  }
`;

const Box = styled.div`
  margin: 0 auto;
  width: 800px;
  margin-top: 70px;
  border-radius: 5px;
  overflow: hidden;
  background: ${({ theme }) => theme.dark2Color};
`;

const TagsContainer = styled.div`
  padding: 10px;
  display: flex;
`;

const TagContainer = styled.div`
  margin: 5px 0;
`;

const CreateTagForm = styled.div`
  padding: 14px;
`;

const Tags: FC = () => {
  const textInput = createRef<HTMLInputElement>();

  return (
    <Box>
      <Query query={GET_TAGS}>
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          if (error) {
            return error;
          }

          return (
            <TagsContainer>
              {data.tags.map(tag => (
                <TagContainer key={tag.id}>
                  <Mutation
                    mutation={REMOVE_TAG}
                    update={cache => {
                      const { tags } = cache.readQuery({ query: GET_TAGS });

                      cache.writeQuery({
                        query: GET_TAGS,
                        data: {
                          tags: tags.filter(t => t.id !== tag.id)
                        }
                      });
                    }}
                  >
                    {removeTag => (
                      <Tag
                        id={tag.id}
                        onClickRemoved={() =>
                          removeTag({ variables: { id: tag.id } })
                        }
                      />
                    )}
                  </Mutation>
                </TagContainer>
              ))}
            </TagsContainer>
          );
        }}
      </Query>
      <Mutation
        mutation={CREATE_TAG}
        update={(cache, { data: { createTag } }) => {
          const { tags } = cache.readQuery({ query: GET_TAGS });

          if (createTag) {
            cache.writeQuery({
              query: GET_TAGS,
              data: {
                tags: [...tags, createTag]
              }
            });
          }
        }}
      >
        {createTag => (
          <CreateTagForm>
            <Input
              autoFocus
              placeholder="Введите название тега и нажмите Enter"
              ref={textInput}
              onKeyPress={e => {
                const title = textInput.current.value.trim();

                if (e.key === 'Enter' && title.length > 0) {
                  createTag({ variables: { title } });
                  textInput.current.value = '';
                }
              }}
            />
          </CreateTagForm>
        )}
      </Mutation>
    </Box>
  );
};

export default Tags;
