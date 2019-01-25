import { FC } from 'react';
import styled from 'styled-components';
import Access from '../../Access';
import Categories from './Categories';
import Follows from './Follows';
import MenuItem from './Item';
import MenuSubItem from './SubItem';

const Box = styled.div`
  padding: 10px 0;
`;

const LeftMenu: FC = () => (
  <Box>
    <MenuItem route="/" equal icon="home" title="Главная" />
    <MenuItem route="/hot" icon="fire" title="В тренде" />
    <MenuItem route="/new" icon="flare" title="Новое" />
    <MenuItem route="/top" icon="trending-up" title="Топ">
      <MenuSubItem route="/top/day">День</MenuSubItem>
      <MenuSubItem route="/top/week">Неделя</MenuSubItem>
      <MenuSubItem route="/top/month">Месяц</MenuSubItem>
      <MenuSubItem route="/top/all">Все время</MenuSubItem>
    </MenuItem>
    <MenuItem route="/categories" icon="apps" title="Категории">
      <Categories />
    </MenuItem>
    <Access>
      <MenuItem route="/likes" icon="thumb-up" title="Понравившиеся" />
      <MenuItem route="/follows" icon="favorite" title="Подписки">
        <Follows />
      </MenuItem>
    </Access>
  </Box>
);

export default LeftMenu;
