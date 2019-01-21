import Head from 'next/head';
import { RouterProps, withRouter } from 'next/router';
import * as React from 'react';
import styled from '../theme';
import { scrollToTop } from '../utils/scroll';
import { changeURLParams } from '../utils/url';
import Discord from './Discord';
import Posts from './Posts';
import PostsFeedSortPanel from './PostsFeedSortPanel';
import RightPanel from './RightPanel';
import Rules from './Rules';
import ScrollTopButton from './ScrollTopButton';
import Streams from './Streams';
import UsersTop from './UsersTop';

const setSort = (sort: string) => {
  if (sort === 'new') {
    changeURLParams({ remove: ['sort', 'page'] });
  } else {
    changeURLParams({ set: { sort }, remove: ['page'] });
  }

  scrollToTop();
};

const getSortPageTitle = (sortType: string) => {
  switch (sortType) {
    case 'hot':
      return 'Hot';
    case 'new':
      return 'New';
    case 'topDay':
      return 'Top за день';
    case 'topWeek':
      return 'Top за неделю';
    case 'topMonth':
      return 'Top за месяц';
    case 'topAll':
      return 'Top за все время';
  }

  return '';
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0;
`;

const PostsBox = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  width: 800px;
`;

interface IProps {
  router: RouterProps;
}

class PostsFeed extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    let page = 0;
    let sort = 'new';

    if (typeof this.props.router.query.sort === 'string') {
      sort = this.props.router.query.sort;
    }

    if (
      this.props.router.query.page &&
      typeof this.props.router.query.page === 'string'
    ) {
      page = parseInt(this.props.router.query.page, 10);
    }

    return (
      <Box>
        <Head>
          <title>TwitchRu - {getSortPageTitle(sort)}</title>
        </Head>
        <PostsBox>
          <PostsFeedSortPanel
            sort={sort}
            setSort={sortType => setSort(sortType)}
          />
          <Posts page={page} sort={sort} />
        </PostsBox>
        <RightPanel.Box>
          <RightPanel.Block>
            <Streams />
          </RightPanel.Block>
          <RightPanel.Block>
            <Rules />
          </RightPanel.Block>
          <RightPanel.Block>
            <UsersTop />
          </RightPanel.Block>
          <RightPanel.Block>
            <Discord />
          </RightPanel.Block>
        </RightPanel.Box>
        <ScrollTopButton />
      </Box>
    );
  }
}

export default withRouter(PostsFeed);
