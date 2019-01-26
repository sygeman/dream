import { withRouter } from 'next/router';
import { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../../../ui/Button';
import { Modal } from '../../../ui/Modal';
import { changeURLParams } from '../../../utils/url';
import Auth from '../../Auth';

const Box = styled.div`
  padding: 0 10px;
`;

interface IProps {
  router: any;
}

class GuestBlockWithoutRouter extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router } = this.props;

    return (
      <Box>
        <Button onClick={() => changeURLParams({ set: { auth: 1 } })}>
          Закинуть клип
        </Button>
        {` `}
        <Button onClick={() => changeURLParams({ set: { auth: 1 } })}>
          Войти
        </Button>

        <Modal
          minimal
          isOpen={router.query.auth === '1'}
          onClose={() => changeURLParams({ remove: ['auth'] })}
        >
          <Auth />
        </Modal>
      </Box>
    );
  }
}

export default withRouter(GuestBlockWithoutRouter);
