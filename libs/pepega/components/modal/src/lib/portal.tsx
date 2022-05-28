import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  selector: string;
  children?: React.ReactNode;
}

export const Portal: FC<IProps> = ({ selector, children }) => {
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!document) {
      return;
    }

    if (!document.querySelector(`#${selector}`)) {
      const p = document.createElement('div');
      p.id = selector;
      document.body.appendChild(p);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setElement(document.querySelector(`#${selector}`));
  }, [selector]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return element ? createPortal(children, element) : null;
};
