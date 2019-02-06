import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  selector: string;
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

    setElement(document.querySelector(`#${selector}`));
  }, [selector]);

  return element ? createPortal(children, element) : null;
};
