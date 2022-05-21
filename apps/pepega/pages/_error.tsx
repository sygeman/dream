import { Component } from 'react';
import { MainLayout } from '@dream/pepega/layouts/main';

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
      <MainLayout>
        <div className="flex h-full w-full items-center justify-center text-lg">
          {statusCode
            ? '404. Такой страницы не существует'
            : `Ошибка ${statusCode}`}
        </div>
      </MainLayout>
    );
  }
}

export default ErrorPage;
