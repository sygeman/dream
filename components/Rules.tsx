import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from '../theme';
import { changeURLParams } from '../utils/url';

const Box = styled.div`
  background: radial-gradient(
    ${({ theme }) => lighten(0.02, theme.dark2Color)},
    ${({ theme }) => darken(0.02, theme.dark2Color)}
  );
  font-size: 13px;
`;

const RulesBox = styled.div`
  padding: 8px 16px;

  ol {
    counter-reset: myCounter;
    line-height: 20px;
  }

  li {
    color: ${({ theme }) => theme.accent2Color};

    a {
      color: ${({ theme }) => theme.text1Color};
      cursor: pointer;
    }
    list-style: none;
  }

  li:before {
    counter-increment: myCounter;
    content: counter(myCounter);
    color: ${({ theme }) => darken(0.3, theme.accent2Color)};
    display: inline-block;
    text-align: center;
    margin-right: 10px;
  }
`;

const RulesTitle = styled.div`
  background: ${({ theme }) => theme.main1Color};
  font-size: 12px;
  padding: 12px 0;
  text-align: center;
  text-transform: uppercase;
`;

export const Rules: FC = () => (
  <Box>
    <RulesTitle>Как закинуть клип</RulesTitle>
    <RulesBox>
      <ol>
        <li>
          <a onClick={() => changeURLParams({ set: { auth: 1 } })}>Войди</a> на
          сайт
        </li>
        <li>
          Нажми на{' '}
          <a onClick={() => changeURLParams({ set: { newPost: 1 } })}>
            Закинуть клип
          </a>
        </li>
        <li>Назови свой пост</li>
        <li>Вставь ссылку на клип</li>
        <li>Укажи есть ли в клипе nsfw контент</li>
        <li>Нажми на Создать для завершения</li>
      </ol>
    </RulesBox>
  </Box>
);

export default Rules;
