import { FC } from 'react';

interface IProps {
  type: string;
}

const Icon: FC<IProps> = ({ type }) => <i className={`zmdi zmdi-${type}`} />;

export default Icon;
