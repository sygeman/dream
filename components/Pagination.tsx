import { FC } from 'react';
import styled from '../theme';
import { Button, ButtonFlat, ButtonGroup } from '../ui/Button';

const isExistPage = (pageNumber: number, postsCount: number) => {
  if (pageNumber < 0) {
    return false;
  }

  const postsOnPage = 10;

  return postsCount > pageNumber * postsOnPage;
};

const getAroundPages = (currentPage: number, postsCount: number) => {
  const around = 3;

  const res = {
    prev: [],
    next: [],
    prevMore: false,
    nextMore: false
  };

  for (let page = currentPage - around; page <= currentPage + around; page++) {
    if (isExistPage(page, postsCount)) {
      if (page < currentPage) {
        res.prev.push(page);
      } else if (page > currentPage) {
        res.next.push(page);
      }
    }
  }

  res.prevMore = isExistPage(currentPage - around - 1, postsCount);
  res.nextMore = isExistPage(currentPage + around + 1, postsCount);

  return res;
};

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

const PaginationPrev = styled.div`
  min-width: 70px;
  display: flex;
  justify-content: flex-start;
`;

const PaginationCurrent = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.accent2Color};
  flex: 1;
  display: flex;
  justify-content: center;
`;

const PaginationNext = styled.div`
  min-width: 70px;
  display: flex;
  justify-content: flex-end;
`;

interface IProps {
  page: number;
  setPage: (pageNumber: number) => void;
  rowsCount: number;
}

const Pagination: FC<IProps> = ({ page, setPage, rowsCount }) => {
  const aroundPages = getAroundPages(page, rowsCount);

  return (
    <Box>
      <PaginationPrev>
        {page !== 0 && <Button onClick={() => setPage(page - 1)}>Назад</Button>}
      </PaginationPrev>
      <PaginationCurrent>
        {aroundPages.prevMore && <ButtonFlat>...</ButtonFlat>}
        <ButtonGroup>
          {aroundPages.prev.map(pageN => (
            <Button key={`p${pageN}`} onClick={() => setPage(pageN)}>
              {pageN + 1}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonFlat>{page + 1}</ButtonFlat>
        <ButtonGroup>
          {aroundPages.next.map(pageN => (
            <Button key={`p${pageN}`} onClick={() => setPage(pageN)}>
              {pageN + 1}
            </Button>
          ))}
        </ButtonGroup>
        {aroundPages.nextMore && <ButtonFlat>...</ButtonFlat>}
      </PaginationCurrent>
      <PaginationNext>
        {rowsCount > (page + 1) * 10 && (
          <Button onClick={() => setPage(page + 1)}>Далее</Button>
        )}
      </PaginationNext>
    </Box>
  );
};

export default Pagination;
