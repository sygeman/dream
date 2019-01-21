import { FC } from 'react';

interface IProps {
  type: string;
}

export const Icon: FC<IProps> = ({ type }) => (
  <i className={`zmdi zmdi-${type}`} />
);
