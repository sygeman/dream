import styled from 'styled-components';
import { lighten } from 'polished';
import { Rectangle169 } from '@pepega/pepega-ui';

const Box = styled.div`
  width: 1000px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.surface};

  ul {
    margin-left: 30px;
  }
`;

const StreamsLine = styled.div`
  display: flex;
  justify-content: center;
`;

const StreamMockBox = styled.div`
  width: 150px;
  margin: 6px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`;

const HelpText = styled.p`
  font-size: 13px;
  padding: 10px 0;
  color: ${({ theme }) => lighten(0.5, theme.colors.surface)};
`;

const StreamMockContent = styled.div`
  color: ${({ theme }) => lighten(0.4, theme.colors.surface)};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  padding: 0 16px;
`;

const StreamMock = ({ children }) => (
  <StreamMockBox>
    <Rectangle169>{children}</Rectangle169>
  </StreamMockBox>
);

const StreamMockLive = () => (
  <StreamMock>
    <StreamMockContent>Прямая трансляция</StreamMockContent>
  </StreamMock>
);

const StreamMockStatic = () => (
  <StreamMock>
    <StreamMockContent>Превью изображение</StreamMockContent>
  </StreamMock>
);

export const PromoterHelp = () => {
  return (
    <Box>
      <h2>Продвижение каналов</h2>
      <br />
      <h4>Размещение</h4>
      <HelpText>
        Стримы размещаются на главной в ряд (максимум 6) и на странице с клипом
        колонкой справа (максимум 3). Первые 2 позиции это плееры твича с прямой
        трансляцией в качестве 160p, остальные превью с изображением.
      </HelpText>
      <StreamsLine>
        <StreamMockLive />
        <StreamMockLive />
        <StreamMockStatic />
        <StreamMockStatic />
        <StreamMockStatic />
        <StreamMockStatic />
      </StreamsLine>
      <br />
      <h4>Позиция стрима</h4>
      <HelpText>
        Позицию стрима определяет ставка в PepeCoin, у канала с наибольшой
        цифрой позиция выше.
      </HelpText>
      <br />
      <h4>Стрим завис</h4>
      <HelpText>
        Если стрим на 1 или 2 позиции завис, то скорее всего твич не предоставил
        выбора качества. Сразу после запуска трансляции убедитесь что у вашего
        стрима есть выбор качества. Если выбора нет, то можете попробовать
        перезапустить стрим (возможно несколько раз), изменить вручную сервер в
        OBS куда идет поток. У каналов компаньонов шанcы получить выбор качества
        немного выше.
      </HelpText>
      <br />
      <h4>Списание средств</h4>
      <HelpText>
        Спиание PepeCoin происходит каждую минуту за канал который вы
        продвигаете если:
        <ul>
          <li>На канале в данный момент идет прямая трансляция</li>
          <li>Cтавка канала позволяет ему попасть в топ 6</li>
        </ul>
      </HelpText>
    </Box>
  );
};
