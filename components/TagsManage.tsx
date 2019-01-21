import gql from 'graphql-tag';
import { differenceWith } from 'lodash';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from '../theme';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import Icon from './Icon';
import Tag from './Tag';

const GET_TAGS = gql`
  query tags {
    tags {
      id
    }
  }
`;

const Box = styled.div`
  padding: 10px;
`;

const TagsTitle = styled.div`
  font-size: 14px;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
`;

const AddTagMenu = styled.div`
  display: flex;
  background: ${({ theme }) => theme.dark1Color};
  border-radius: 5px;
`;

const AddTagButton = styled(Button)`
  i {
    font-size: 15px;
  }
`;

interface IProps {
  tags: string[];
  onTagAdded: (tagId: string) => void;
  onTagRemoved: (tagId: string) => void;
}

const TagsMange: FC<IProps> = ({ tags, onTagAdded, onTagRemoved }) => (
  <Box>
    <TagsTitle>Теги</TagsTitle>
    <Tags>
      {tags.map(tagId => (
        <Tag
          id={tagId}
          key={tagId}
          onClickRemoved={() => onTagRemoved(tagId)}
        />
      ))}
      {tags.length < 3 && (
        <Dropdown
          overlay={
            <AddTagMenu>
              <Query query={GET_TAGS}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return null;
                  }

                  if (error) {
                    return error;
                  }

                  const tagsWithFilter = differenceWith(
                    data.tags,
                    tags,
                    (a: any, b) => a.id === b
                  );

                  return (
                    <>
                      {tagsWithFilter.map(tag => (
                        <Tag
                          id={tag.id}
                          onClick={() => onTagAdded(tag.id)}
                          key={tag.id}
                        />
                      ))}
                    </>
                  );
                }}
              </Query>
            </AddTagMenu>
          }
        >
          <AddTagButton>
            <Icon type="plus" />
          </AddTagButton>
        </Dropdown>
      )}
    </Tags>
  </Box>
);

export default TagsMange;
