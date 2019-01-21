import { RouterProps, withRouter } from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import styled from '../../theme';
import { changeURLParams } from '../../utils/url';
import Access from '../Access';
import SectionContent from './SectionContent';

const Box = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const SectionsBox = styled.div`
  min-width: 240px;
  overflow-y: auto;
  background: ${({ theme }) => theme.dark2Color};
`;

const SectionGroupTitle = styled.div`
  color: ${({ theme }) => theme.accent2Color};
  font-size: 13px;
  width: 100%;
  padding: 12px;
  text-transform: uppercase;
`;

const Section = styled('div')<{
  active?: boolean;
}>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 5px 20px;
  font-size: 14px;
  cursor: pointer;
  background: ${({ theme, active }) =>
    active ? lighten(0.1, theme.dark2Color) : 'transparent'};

  :hover {
    background: ${({ theme, active }) =>
      active
        ? lighten(0.1, theme.dark2Color)
        : lighten(0.05, theme.dark2Color)};
  }
`;

const SectionContentBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  background: ${({ theme }) =>
    'radial-gradient(' + theme.main1Color + ', ' + theme.dark2Color + ')'};
`;

interface IProps {
  router: RouterProps;
}

class Manage extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router } = this.props;

    const name = router.query.section ? router.query.section.toString() : '';

    return (
      <Box>
        <Access allow={currentUser => currentUser.role === 'admin'}>
          <SectionsBox>
            <SectionGroupTitle>Основное</SectionGroupTitle>
            <Section
              onClick={() => changeURLParams({ remove: ['section'] })}
              active={name === ''}
            >
              Dashboard
            </Section>
            <Section
              onClick={() => changeURLParams({ set: { section: 'tags' } })}
              active={router.query.section === 'tags'}
            >
              Теги
            </Section>
            <SectionGroupTitle>Продвижение</SectionGroupTitle>
            <Section
              onClick={() => changeURLParams({ set: { section: 'streams' } })}
              active={router.query.section === 'streams'}
            >
              Стримеры
            </Section>
            <Section
              onClick={() => changeURLParams({ set: { section: 'pinposts' } })}
              active={router.query.section === 'pinposts'}
            >
              Посты
            </Section>
          </SectionsBox>
          <SectionContentBox>
            <SectionContent name={name} />
          </SectionContentBox>
        </Access>
      </Box>
    );
  }
}

export default withRouter(Manage);
