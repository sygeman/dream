import { darken } from 'polished';
import { FC } from 'react';
import styled from '../theme';
import { Button, ButtonFlat, ButtonGroup } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { Icon } from '../ui/Icon';

const SortPanel = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const TopCurrentSort = styled.div`
  margin-right: 5px;
  font-size: 13px;
  color: ${({ theme }) => theme.text1Color};
`;

const SortTopMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.main1Color};
  color: #fff;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SortTopMenuItem = styled.div`
  font-size: 13px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-align: center;

  :hover {
    background: ${({ theme }) => darken(0.1, theme.main1Color)};
  }
`;

interface IProps {
  sort?: string;
  setSort: (sortType: string) => void;
}

const PostsFeedSortPanel: FC<IProps> = ({ sort, setSort }) => {
  const unactiveColor = '#25222C';

  const isSortTop =
    sort === 'topDay' ||
    sort === 'topWeek' ||
    sort === 'topMonth' ||
    sort === 'topAll';

  let sortTopCurrentTitle = '';

  switch (sort) {
    case 'topDay':
      sortTopCurrentTitle = 'День';
      break;
    case 'topWeek':
      sortTopCurrentTitle = 'Неделя';
      break;
    case 'topMonth':
      sortTopCurrentTitle = 'Месяц';
      break;
    case 'topAll':
      sortTopCurrentTitle = 'За все время';
      break;
  }

  return (
    <SortPanel>
      <ButtonGroup>
        <Button
          mainColor={sort === 'hot' ? undefined : unactiveColor}
          onClick={() => setSort('hot')}
        >
          Hot
        </Button>
        <Button
          mainColor={sort === 'new' ? undefined : unactiveColor}
          onClick={() => setSort('new')}
        >
          New
        </Button>
        <Button
          mainColor={isSortTop ? undefined : unactiveColor}
          onClick={() => setSort('topDay')}
        >
          Top
        </Button>
      </ButtonGroup>
      {isSortTop && (
        <Dropdown
          overlay={
            <SortTopMenu>
              <SortTopMenuItem onClick={() => setSort('topDay')}>
                День
              </SortTopMenuItem>
              <SortTopMenuItem onClick={() => setSort('topWeek')}>
                Неделя
              </SortTopMenuItem>
              <SortTopMenuItem onClick={() => setSort('topMonth')}>
                Месяц
              </SortTopMenuItem>
              <SortTopMenuItem onClick={() => setSort('topAll')}>
                За все время
              </SortTopMenuItem>
            </SortTopMenu>
          }
        >
          <ButtonFlat>
            <TopCurrentSort>{sortTopCurrentTitle}</TopCurrentSort>
            <Icon type="caret-down" />
          </ButtonFlat>
        </Dropdown>
      )}
    </SortPanel>
  );
};

export default PostsFeedSortPanel;
