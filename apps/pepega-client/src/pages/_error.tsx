import { Component } from 'react';
import styled from 'styled-components';
import Layout from 'src/layouts/Main';

const ErrorBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.accent1Color};
`;

interface IProps {
  statusCode?: any;
}

class ErrorPage extends Component<IProps> {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Layout>
        <ErrorBox>
          {statusCode
            ? '404. Такой страницы не существует'
            : `Ошибка ${statusCode}`}
        </ErrorBox>
      </Layout>
    );
  }
}

export default ErrorPage;
